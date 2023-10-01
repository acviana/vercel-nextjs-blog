---
title: Notes on Chapter 1 and 2 of What are Embeddings
description: Notes on Chapter 1 and 2 of Vicki Boykis's "What Are Embeddings" paper
date: 2023-10-01
author: acv
tag: blog, machine-learning, ai, papers, linear-algebra
---

[What are Embeddings](https://vicki.substack.com/p/what-are-embeddings) is an excellent long-form primer on the topic of [embeddings](https://en.wikipedia.org/wiki/Word_embedding) - vector representations of data used for deep learning applications. The material makes a great counterpart to my current self-study of linear algebra, showing how concepts in vector spaces can be applied to deep learning in very concrete way. 

This paper is distinct in my opinion in that Vicki goes to great lengths to contextualize the problem of embeddings at a number of different levels, starting from when you might want to use an ML model or a recommender system at all. She also gives historical context of how embeddings evolved and what problems they solved. I encourage you to read to original text.

Below are my highlights and notes from the first 2 chapters, the Introduction and "Recommendations as a Business Problem". Most of my notes focuses on the later chapter on different frameworks for thinking about end-to-end search and recommendation systems. 

I look forward to finding more time to dig into the remaining sections which are more technical, as well as read the foundational [Word2Vec](https://en.wikipedia.org/wiki/Word2vec) paper.

## 1. Introduction

> embeddings — deep learning models’ internal representations of their input data (p. 4)

> The usage of embeddings to generate compressed, context-specific representations of content exploded in popularity after the publication of Google’s Word2Vec paper (p.4)

> [A graph of] Embeddings papers in Arxiv by month. It’s interesting to note the decline in frequency of embeddings-specific papers, possibly in tandem with the rise of deep learning architectures like GPT (p.5 )

>Transformer [66] architecture, with its self-attention mechanism, a much more specialized case of calculating context around a given word, has become the de-facto way to learn representations of growing multimodal vocabularies (p.5)

> As a general definition, embeddings are data that has been transformed into n-dimensional matrices for use in deep learning computations. (p.5)

3 steps of the embedding process:

1. **Transform** multimodal input into representations such as vectors, tensors, or graphs.
2. **Compress** inputs for use by an ML task, a fixed input such tagging, labeling, or semantic search.
3. **Create an Embedding Space** that is specific to the training space but can be generalized to other tasks and domains. This generalizability is the reason embeddings are so popular.

>We often talk about item embeddings being in X dimensions, ranging anywhere from 100 to 1000, with diminishing returns in usefulness somewhere beyond 200-300 in the context of using them for machine learning problems4.

>In Systems Thinking, Donella Meadows writes, “You think that because you understand ’one’ that you must therefore understand ’two’ because one and one make two. But you forget that you must also understand ’and.’" (p.9)

## 2. Recommendations as a Business Problem

>How do we solve the problem of what to show in the timeline here so that our users find the content relevant and interesting, and balance the needs of our advertisers and business partners? (p.10)

### 2.1 Building a Web App

No Notes
### 2.2 Rules-based systems versus machine learning

>In short, the difference between programming and machine learning development is that we are not generating answers through business rules, but business rules through data. (p. 14)

### 2.3 Building a web app with machine learning

The 4 components of a machine learning system:

- **Input Data:** processing data from a stream or a database
- **Feature Engineering and Selection:** picking which features (attributes of the data) to use as inputs to machine learning. Embeddings are used as inputs here. 
- **Model Building:** Select the important features and train the model, iterating to optimize performance. Embeddings are *also* the output of this step and be (re)used downstream.
- **Model Serving**: Put the model in prod.

The 3 highest-level types of ML tasks:

- **Supervised:** when we have training data that can tell us if the model predictions are correct (e.g. regression, SVM, NN)
- **Unsupervised:** when this is no single ground-truth answer, patterns can be detected but have to be interpreted. (e.g. clustering, PCA)
- **Reinforcement Learning:** Akin to a game theory problem. We have an agent moving through a model and we want to iteratively learn an optimal strategy. (e.g. PCA and Word2Vec).

### 2.4 Formulating a machine learning problem

Again, that attributes of the data are called the features. In general, this is a really good section to review as an overview of a ML learning process.

We use linear regression to train a model but then use **gradient descent** to minimize the cost function (in this example MSE). As a reminder:

$$
MSE = \frac{1}{N} \sum^{n}_{i=1}(y_{i} - (mx_{i} + b))^{2}
$$

#### 2.4.1 The Task of Recommendations

The general task of recommender systems is **information retrieval** which is focused on pulling relevant information from large corpuses. Within information retrieval we have 2 complimentary approaches: 

- **Search:** Direction information seeking, well established at this point.
- **Recommendation:** The query is not directly given but inferred based on learned taste and preferences.

> The first industrial recommender systems were created to filter messages in email and newsgroups [22] at the Xerox Palo Alto Research Center based on a growing need to filter incoming information from the web. The most common recommender systems today are those at Netflix, YouTube, and other large-scale platforms that need a way to surface relevant content to users.

Common approaches to recommender systems:

- **Collaborative Filtering:** *"finding missing user-item interactions in a given set of user-item interaction history"*, e.g. most people who watch 8 Star Wars movies watch the 9th and you still have not watched the 9th. There are two main approaches:
	- **Neighborhood Models:** Finding similar users based on similarity functions.
	- **Matrix Factorization:** *"the process of representing users and items in a feature matrix made up of low-dimensional factor vectors, which in our case, are also known as embeddings, and learning those feature vectors through the process of minimizing a cost function"* (p. 21) This is similar to Word2Vec.
- **Content Filtering:** "*This approach uses metadata available about our items (for example in movies or music, the title, year released, genre, and so on) as initial or additional features input into models and work well when we don’t have much information about user activ- ity*" (p. 21)
- **Learn to Rank:** pair-wise rankings of items. "*This step normally takes place after candidate generation, in a filtering step, because it’s computationally expensive to rank extremely large lists*" (p.21)
- **Neural Recommendations:** NN capture the same relationships as matrix factorization and this is were we see deep learning networks like Word2Vec and BERT. An example is convolutional and recurrent NN for sequential recommendation such as in music playlists.

Recommender systems tend to have a specialized architecture with 4 stages:

1. **Candidate Generation:** A first-pass model that generates a smaller list of candidates down from millions to thousands or hundreds.
2. **Ranking:** Ordering the list of candidate recommendations based on predicted user preference.
3. **Filtering:** Remove unwanted items e.g. NSFW content or sale items
4. **Retrieval:** Hit the modal endpoint to get final list.

Embeddings play a role in search and recommendation systems similar to that of databases in backend architectures. 

>Embeddings are a type of machine learning feature — or model input data — that we use first as input into the feature engineering stage, and the first set of results that come from our candidate generation stage, that are then incorporated into downstream processing steps of ranking and retrieval to produce the final items the user sees.
#### 2.4.2 Machine Learning Features

>As a general rule, the creation of the correct formulation of input data is perhaps the heart of machine learning. I.e. if we have bad input, we will get bad output.

> The process of formatting data correctly to feed into a model is called fea- ture engineering [...] when we have textual data, we need to turn it into numerical representations so that we can compare these representations.
### 2.5 Numerical Feature Vectors

This section just explains encoding text as a numerical value so we can represent it as a vector.
### 2.6 From Words to Vectors in Three Easy Pieces

In deep learning architectures and NLP-related tasks you repeatedly see the following core concepts:

- **Encoding:** Representing non-numerical multimodal data as numbers.
- **Vectors:** We store our data as vectors
- **Lookup Matrices:** hash tables to allow for efficient lookups between words and numbers 
