Title: A Basic Automation Setup for Astronomy: Part 2
Date: 2013-12-10
Tags: code, devops, python
Slug: a-basic-automation-setup-2
Author: Alex C. Viana
Category: Work
Status: draft

### Why Log Files?

Let's put on our imagining caps. Pretend that you have already set up an automated pipeline like the one I described in the first post in this series (In fact some people already have). One day your boss walks into your office and asks for some details on about something you pipeline made 6 months ago. Maybe they want to know what input files were used. Or what settings and options were used. Or Maybe they want to reproduce a figure. How would you do that? 

Something that I think sometimes gets lost when you start to transfer you work to a more automated work flow is our old friend the lab notebook. For any data products your automation platform produces you should be able to tell someone exactly what inputs were used, what software, and even what version of your software. Ideally, someone should even be able to figure this out for themselves. Log files are a great way to accomplish this type of detailed record keeping, essentially generating an automated lab notebook. Here is an example output from one of my scripts:

```
2013-11-22 10:08:52,719 - INFO - User: jstrummer
2013-11-22 10:08:52,720 - INFO - Host: casbah
2013-11-22 10:08:52,745 - INFO - Machine: x86_64
2013-11-22 10:08:52,747 - INFO - Platform: Linux-2.6.32-358.18.1.el6.x86_64-x86_64-with-redhat-6.4-Santiago
2013-11-22 10:08:52,747 - INFO - Command-line arguments used:
2013-11-22 10:08:52,747 - INFO - reproc: False
2013-11-22 10:08:52,747 - INFO - filelist: /*_saturn/*single_sci.fits
2013-11-22 10:08:52,820 - INFO - Processing 2722 files.
2013-11-22 10:08:52,821 - INFO - Now running on u2ona109t_c0m_center_single_sci.fits
...
```

With the command line `grep` utility you can quickly start to look for trends. If you want to do even more you can explore the Pandas Python package, more on that in a later post. 

### Getting Started with the Python Logger 

Python has a great [logging](http://docs.python.org/2/library/logging.html) module. You can find a basic tutorial [here](http://docs.python.org/2/howto/logging.html#logging-basic-tutorial). There are lots of ways to invoke and setup the Python logger. I usually define a function something like this and import it throughout my project.

```python
import logging
import os
import datetime

def setup_logging(module):
    """Set up the logging."""
    log_file = os.path.join('/my-project/logs/', module,
        module + '_' + datetime.datetime.now().strftime('%Y-%m-%d-%H-%M') + '.log')
    logging.basicConfig(filename = log_file,
        format = '%(asctime)s %(levelname)s: %(message)s',
        datefmt = '%m/%d/%Y %H:%M:%S %p',
        level = logging.INFO)
```

What this does is it will create a separate log directory for each module and the log the outputs in a date-stamped file, e.g. `/my-project/logs/my_module/my_module_2013-12-22-15-41.log`. Every line in the log file will then begin with a date and time stamp, followed by the level name and then the logging message, similar to the output I showed in the last section. Lastly, I tell it to log all statements down to the "INFO" level.

### A Logging Recipe 

```python
def log_info(func):
    """Decorator to log some useful environment information."""
    def wrapped(*a, **kw):

    	# Log user, system, and Python metadata
        logging.info('User: ' + getpass.getuser())
        logging.info('System: ' + socket.gethostname())
        logging.info('Python Version: ' + sys.version.replace('\n', ''))
        logging.info('Python Executable Path: ' + sys.executable)

        # Log PyRAF data
        logging.info('PyRAF Version: ' + pyraf.__version__)
        logging.info('PyRAF Path: ' + pyraf.__path__[0])

        # Call the function and log the execution time.
        t1_time = time.time()
        func(*a, **kw)
        t2_time = time.time()
        hours_time, remainder_time = divmod(t2_time - t1_time, 60 * 60)
        minutes_time, seconds_time = divmod(remainder_time, 60)
        logging.info('Elapsed Real Time: {0:.0f}:{1:.0f}:{2:f}'.\
        	format(hours_time, minutes_time, seconds_time))
    return wrapped
```
You script would then looks like this:

```python
@log_info
def main():
	"""My main function."""
	make_science()

if __name__ == '__main__':
	main()
```

