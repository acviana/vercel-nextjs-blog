Title: Writing a FITS File Bigger Than Your Memory
Date: 2014-04-08
Tags: fits, python, code
Slug: writing-a-fits-file-bigger-than-your-memory
Author: Alex C. Viana, Erik Bray
Category: Work

<center>_I've listed [Erik Bray](https://plus.google.com/+ErikBray/about)([GitHub](https://github.com/embray)) as a co-author on this post. Erik is one of the PyFITS developers and this post was born out of an email chain where he explained most of what follows to me, several times._</center>


> "I’ve always thought that one of the the great things about physics is that you can add more digits to any number and see what happens and nobody can stop you."  
> - Randall Munroe, [What If?](https://what-if.xkcd.com/20/)


I've been working a lot lately on my HST WFC3 [PSF project](http://acviana.github.io/tag/psf.html) and recently had to solve a challenging scaling problem that forced me to deal with the hardware limits of my machine. I needed to create a FITS file containing a 4,000,000 x 11 x 11 data cube [^1]. This ends up being more than my 16 GB machine can handle and it resulted in [paging](http://en.wikipedia.org/wiki/Paging) to the virtual memory which killed performance. As I was trying to find a solution to this problem a play on Randall Munroe's quote from the beginning of this post kept popping up in my head:

_"The annoying thing about writing software is that people can just add zeros and break everything and you can't stop them."_ 

So even thought it was exciting that my dataset had grown to the point that it couldn't all fit in memory at once, I was now faced with the problem of how to create a FITS file from a NumPy array that's too big to fit in memory?

### Reading the Docs

I work with FITS files using the Astropy `io.fits` [module](http://astropy.readthedocs.org/en/latest/io/fits/index.html). For those of you familiar with PyFITS you'll find that the code in Astropy has been wholly migrated over from PyFITS so the functionality is currently identical. So much so that you can still use the PyFITS docs to understand Astropy's `io.fits`. This is great because the PyFITS FAQ explicitly answers this question: [How can I create a very large fits file from scratch?](http://pyfits.readthedocs.org/en/latest/appendix/faq.html#how-can-i-create-a-very-large-fits-file-from-scratch). Go ahead and read that section. 

With that FAQ as a starting point I ended up with this code snippet:

```python
data = np.zeros((1, 1, 1), dtype=np.float64)
hdu = fits.PrimaryHDU(data=data)
header = hdu.header
header['NAXIS1'] = 11
header['NAXIS2'] = 11
header['NAXIS3'] = 4000000
header.tofile(fits_file_name, clobber=True)
header_length = len(header.tostring())
data_length = math.ceil(11 * 11 * 4000000 * 8 / 2880.0)
with open(fits_file_name, 'rb+') as fobj:
    fobj.seek(header_length + data_length  - 1)
    fobj.write('\0')
```

The FAQ got me 80% of the way there and Erik helped me connect the dots. It's worth walking though this for this last 20% as well as an explanation of what exactly is going on.

### Hacking the Header

```python
data = np.zeros((1, 1, 1), dtype=np.float32)
hdu = fits.PrimaryHDU(data=data)
header = hdu.header
header['NAXIS1'] = 11
header['NAXIS2'] = 11
header['NAXIS3'] = record_count
header.tofile(fits_file_name, clobber=True)
```

To being with I create a dummy NumPy array just to get the FITS dimensionality right. As we keep going you'll see why we didn't just create the HDU with an array the size of our expected output in the first place. Then I create a `PrimaryHDU` instance with that NumPy array. Under the hood the `fits` module is using this to set up some basic elements of the FITS file format. But this is all being done in-memory, I haven't written anything to the disk yet. Next I changes the `NAXIS` keywords required by the FITS standard to match those of our expected output and not those of our dummy NumPy array. Changing this keyword doesn't do anything to actually change the dimensions or size of the file, those were set by our initial NumPy array. But it does update our header to match the data we'll be putting in. To wrap this up I use the `tofile` method to write _only the FITS header_ to the disk with not actual data following it. PyFITS generally won't let you write an invalid FITS file, in this case it would complain that the `NAXIS` values don't match the 1 x 1 x 1 array we used to create the file, but we _can_ write just the header as we're doing here. The clobber option overwrites the file if it already exists. 

### Hacking the Data

```python
header_length = len(header.tostring())
data_length = math.ceil(11 * 11 * 4000000 * 8 / 2880.0)
with open(fits_file_name, 'rb+') as fobj:
    fobj.seek(header_length + data_length  - 1)
    fobj.write('\0')
```

Now comes the interesting part. One specific advantage Python offers scientists without a programming background is that Python is a "high level" programming language. The term "high" is subjective but the point is that Python takes care of many of the "low-level" aspects of programming such as memory allocation, pointers, and garbage collection. However, as you get further into the language you'll find that you have to learn how these concepts are implemented to take solve more complicated problems. This was one of those times for me.

Let's jump to the middle where I use the "new" standard Python convention of using `with` to open a file object. In this case I open it with the `rb+` setting which means I'm going to be read (`r`) and update (`+`) the file in binary mode (`b`). Binary mode means that rather than trying to decode strings in something like UTF-8 the file object will read raw bytes. 

When you open a file object in binary update mode your current position is the beginning of the file. Meaning if you tell python to start reading or writing to the file it will start right a the beginning of the file. In my case I don't want that so I first use the `seek` function to tell Python how far ahead on the disk to skip in units of bytes. In this case I want to seek ahead by the length of my final FITS file in units of bytes. It's worth noting that I'm taking advantage of the fact that `seek` will, by design, seek past the end of the file. It's worth noting that this is all being done at a very high level, I'm not actually seeking on the disk or even memory locations. 

For clarity I've broken up this calculation into two variables, `header_length` and `data_lenght`. I use the `tostring` [method](http://stsdas.stsci.edu/stsci_python_sphinxdocs_2.13/pyfits/api_docs/api_headers.html?highlight=tostring#pyfits.Header.tostring) to return a string representation of the header. Because each character can be represented by one byte the string length is the same as the byte length.

Next I figure out how many bytes my data is going to be. I do this by multiplying the number of elements in my array times the number of bytes required to store each element. This is interesting and something I haven't really thought about before; I can tell Python exactly how big my file will be before I write anything to it. I'm using a double precision, or 64bit, floating point, which can be represented by 8 bytes. So my data will take `11 x 11 x 4,000,000 x 8 byes` or a little over 3.6 GB. 

Now you can start to see why we needed to go through all this trouble. This data would have first have to have been read into memory from a different format (SQL in this case) and then copied into a NumPy array, that's 7+ GB of memory right there. Additionally, there's a couple of GB of metadata I need to load in as well, plus what's being used by system. And my data set is growing constantly. Suddenly, it's clear why we couldn't do this all in memory. 

Actually, you'll notice it's a little more complicated then that. I'm actually rounding up to the next multiple of 2880 bytes. This is because, and I'm trying to say this with a straight face, of historical limitations on how _tape_ machines used to read FITS data. So just like the FORTRAN line limit, this is a historical artifact we just have to live with. If you read the documentation carefully for the `header.tostring` method you'll see this was automatically done for the header when it was turned into a string.

Also notice that I never had to tell Python _what_ was going to be in those bytes. An array of complex decimals takes up just as much space as an array of zeros if they're both stored as the same data type. _This_ is the reason I couldn't just create our original HDU with a 4,000,000 x 11 x 11 NumPy array of zeros - that would take up just as much room as a NumPy array of the real data! 

But what about the `- 1` at the end? Well I go back just one byte from the end to write the final character of the FITS file, the `\0` byte. In this case it acts as kind of like a place holder staking out how big the file is going to be. So what was the point of all that? Well, without even needing to create anything in memory anywhere near the size of our dataset we've now created a file exactly big enough to hold all our data. 

Note that what we've created is called a [sparse file](http://en.wikipedia.org/wiki/Sparse_file) and how it's implemented will depend on your file system. Certain file systems will just add some metadata letting the system know that it's just blank space, whereas other file systems such as Apple's HFS+ will go through and write each "blank" byte which will take just as long as writing real data.


### (Finally) Writing the Data

```python
with fits.open(fits_file_name, mode='update') as hdlu:
    for bottom_index, top_index in zip(bottom_index_list, top_index_list):
        numpy_data_cube = get_data_chunk(bottom_index, top_index)
        hdul[0].data[bottom_index:top_index,:,:] = numpy_data_cube 
hdul.close() 
```

Now that I've created the output file of the correct size and dimensionality I can start writing data to the file. Fist I use `fits.open` with the `with` convention to open the FITS file. But wait, what's going on here? Won't opening this file just read all the data into memory - the exact thing we're trying to avoid?

What's happening is that the `fits` module is by default opening the file with [mmap](http://en.wikipedia.org/wiki/Mmap). What this means is that the file is read in a "lazy" or "on-demand" mode, data is only read into memory as needed. You can find more info in both the [Astropy](http://astropy.readthedocs.org/en/latest/io/fits/index.html#working-with-large-files
) and [PyFITS](http://pyfits.readthedocs.org/en/latest/appendix/faq.html#how-do-i-open-a-very-large-image-that-won-t-fit-in-memory) docs.

Next I step through the data I want to add to the FITS file in chunks that easily fit in memory. I wrote some generic code that does this by stepping over some indices and passing them to a function `get_data_chunk` that returns the next "chunk" of records as a NumPy array. I index the FITS data just like a NumPy array (because it is one) and then update it with the chunk from my current data cube. Iterating over this eventually write the entire file without ever needing to store the entire FITS data in memory at once.

### One More Thing

Erik pointed out that there is a little-known feature in PyFITS called the [StreamingHDU](https://github.com/spacetelescope/PyFITS/blob/master/lib/pyfits/hdu/streaming.py) class. It's an alternative way to make a FITS file on disk just by outputting the header and then writing the data one chunk at a time: http://pyfits.readthedocs.org/en/latest/api_docs/api_hdus.html#streaminghdu

[^1]: [FITS](http://en.wikipedia.org/wiki/FITS) is a standard data file format in astronomy.