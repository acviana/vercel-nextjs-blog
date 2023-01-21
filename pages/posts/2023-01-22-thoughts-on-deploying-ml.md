---
title: Notes on Getting ML Models into Production
date: 2023/01/21
description: Some notes on the challenges of getting ML models out of local environments
tag: dev, machine-learning, artifical-intelligence
author: acv
---

I have a friend who wanted to do some interview prep for an ML engineering management role. I ended up writing quite a bit of notes as part of my prep work. When I was done I realized what I had was coherent enough to share as a post.

There are two parts to this post:

1. My own (highly opinionated) thoughts on the barriers to getting analyst driven ML work into production.
2. An exchange I had with Chat GTP-3 to do some background research on deploying ML to AWS. I'm including this since it's both useful and interesting example of how these emerging technologies can be used.

## Context

I have a friend who was interviewing for an engineering leadership role on a team tasked with getting ML models into production. The models are created by a separate data science team. The current project state seems to be analysts developing models in Jupyter notebooks on their own laptops with no real flow into production yet.

## Personal Thoughts

In my opinion, you’re going to need to build out a dedicated ML Engineering team; as opposed to a Data Science or Engineering team. This team will focus not only on getting Ml projects into production but, more importantly, work with your Data Analysts/Scientists to create a framework that Data folks can develop and test against so that they create ML models that are usable in production in addition to being correct.

As always the major problems in doing this are going to be organizational and cultural. There is plenty of room for growth in the ML platform and deployment space but there is more than enough established tooling there to deploy (what I’m assuming are) fairly standard ML models to production. Instead, I think you’re going to find a pretty big skill and cultural gap between what the analysts are producing and what Software Engineers even think of as code, let alone production quality code with best practices.

Jupyter Notebooks are usually completely unfamiliar to Software Engineers who typically do not need the same level of exploration and interactivity that notebooks enable and as a result are unfamiliar with just how different software development can be in that environment. For example, all “cells” in a notebook share a global scope but can be executed individually. As a result, instead of defining reusable functions data practitioners will just use “cells” as proxies for functions, editing and rerunning cells to overwrite variables into the global notebook scope. I can’t emphasize enough that most data folks there are not “hack” this is what “software development” looks like. On one hand they tend to lack exposure to software best practices, it’s not unusual to find a data scientist who is uncomfortable in a text editor, it also typically doesn’t matter in their role. Their job is to produce models that work.

As a result there will likely be a massive gulf between the proof-of-concept code that Data Scientists are writing, and what needs to be put into production. In my (opinionated) view the way forward is to build a ML Engineering team that specializes in getting these models into production.

In the short term this team should be taking models and converting them into whatever deployment architecture makes sense for your application (Docker + EC2, Sagemaker, Lambda, etc). But in the long term they should be building a shared framework (both conceptual and a literal software package) for the data team to develop against. For example, there should be a standard I/O library do things like connected to databases, write outputs to S3, and set up monitoring. Long-term goals for this team would include things like creating testing frameworks, A/B testing, and a pre-production environment.

One final note, there is a school of thought, especially among only moderately technical teams, that the path forward is to reduce the barrier to entry to run notebooks in production. I personally think this is a terrible idea. As I’ve laid out, notebooks are often lacking even the most basic software design patterns for an enterprise production system and should only be used for rapid prototyping.

I did my basic background “Google” with chat GPT3 to get the basics down and then added my own, more detailed, notes at the end.

## Post-Script: Background Research with Chat GPT-3

As part of preparing these notes I started by Googling just to make sure background knowledge was correct and up to date. I was making slow progress through the AWS docs when it occurred to me that I should try using GPT-3 for this.

I was really impressed with the results. A few caveats though, this is an area where I'm not an expert but have enough general knowledge that I could spot a gross error. What follows is my complete "transcript".

#### Q: “How should I deploy ML models to AWS?”

There are several ways to deploy machine learning models to Amazon Web Services (AWS), depending on your specific use case and requirements. Some popular options include:

1. Amazon SageMaker: This is a fully managed service for building, training, and deploying machine learning models. It can be used for a wide range of applications, including image and video analysis, natural language processing, and forecasting.

2. AWS Lambda: This is a serverless compute service that allows you to run code without provisioning or managing servers. You can use AWS Lambda to deploy machine learning models as a microservice, and trigger them from other AWS services or from a web or mobile app.

3. Amazon Elastic Container Service (ECS) or Amazon Elastic Kubernetes Service (EKS): These services allow you to run and manage Docker containers, which can be used to package and deploy machine learning models.

4. AWS DeepLens: This is a deep-learning enabled video camera that can be used to develop and deploy computer vision models.

5. TensorFlow Serving: A flexible, high-performance serving system for machine learning models, designed for production environments.

Each of these services has its own set of benefits and trade-offs, so it's important to choose the one that best fits your use case.

#### Q: “How should I deploy a production grade ML model to AWS SageMaker?”

Deploying a production-grade machine learning model to Amazon SageMaker involves several steps:

1. Prepare your model: Before deploying your model, you need to make sure that it is in the format that SageMaker can work with. This typically involves converting it to a format such as TensorFlow or PyTorch. Additionally, you should make sure that the model is trained and optimized for the intended use case, and that it has been tested and evaluated for performance.

2. Create an Amazon SageMaker model: After preparing your model, you can create a SageMaker model by providing the location of your model artifacts, such as the model.tar.gz file, in an S3 bucket.

3. Create an Amazon SageMaker endpoint configuration: An endpoint configuration is a collection of settings that define how traffic will be distributed to one or more models. You can use this configuration to specify the number of instances to use for an endpoint, and whether to use an Auto Scaling group.

4. Create an Amazon SageMaker endpoint: An endpoint is a URL that you send traffic to, which is associated with a specific endpoint configuration. You can use this endpoint to send real-time predictions to your model.

5. Monitor and troubleshoot your model: Once you have deployed your model, you can use SageMaker's monitoring and troubleshooting tools to keep track of its performance and troubleshoot any issues that arise. This includes metrics such as invocations, latencies, and error rates, as well as access to log files and CloudWatch metrics.

6. Update and Deploy: SageMaker allows for continuous deployment and updating of models. You can use the same endpoint and only update the model, or you can create a new endpoint and redirect traffic to the new endpoint.

It's important to note that these steps may vary depending on the specific use case, and it's always a good idea to consult the AWS SageMaker documentation and best practices for deploying models in production.

#### Q: What are some reasons not to use AWS SageMaker to deploy ML models to an enterprise production environment?

While Amazon SageMaker is a powerful and versatile platform for deploying machine learning models, it may not be the best choice for every enterprise production environment. Here are a few reasons why you might choose not to use SageMaker:

1. Cost: SageMaker can be relatively expensive compared to other options, especially if you need to scale up or down frequently. The costs for using SageMaker includes the cost for using the service, the cost for storing models and data, the cost for running instances and the cost for data transfer.

2. Complexity: SageMaker provides a lot of features and options, which can make it difficult to navigate and set up, especially for teams with limited experience in machine learning and AWS.

3. Limited customization: SageMaker is a fully managed service, which means that you have limited control over the underlying infrastructure. This can make it difficult to customize the environment to meet your specific needs.

4. Limited Interoperability: SageMaker is tightly integrated with other AWS services, so if you are already using other cloud providers or on-premises infrastructure, it may be difficult to integrate SageMaker into your existing environment.

5. Limited to specific frameworks: SageMaker only support a few specific deep learning frameworks, such as TensorFlow, MXNet and PyTorch. If you are using other frameworks, it may not be the best choice.

6. Limited support for custom code: SageMaker does not allow for running custom code or scripts, which can be a drawback if you need to perform additional pre-processing or post-processing on your data or models.

It's important to consider your specific use case and requirements when deciding whether or not to use SageMaker, and weigh the pros and cons of other options such as AWS Lambda, Amazon Elastic Container Service (ECS) or Amazon Elastic Kubernetes Service (EKS) or even TensorFlow Serving.

#### Q: What is the most cost-effective way to deploy ML models to a production enterprise environment on AWS?

The most cost-effective way to deploy machine learning models to a production enterprise environment on AWS will depend on your specific use case and requirements. However, here are a few options that you may want to consider:

1. AWS Lambda: This is a serverless compute service that allows you to run code without provisioning or managing servers. You can use AWS Lambda to deploy machine learning models as a microservice, and trigger them from other AWS services or from a web or mobile app. The major benefit of using Lambda is the pay-per-use pricing model, which means that you only pay for the compute time you consume.

2. Amazon Elastic Container Service (ECS) or Amazon Elastic Kubernetes Service (EKS): These services allow you to run and manage Docker containers, which can be used to package and deploy machine learning models. Both services have different pricing models, but they allow you to create and scale clusters of instances, which can be more cost-effective than using SageMaker instances.

3. TensorFlow Serving: TensorFlow Serving is a flexible, high-performance serving system for machine learning models, designed for production environments. It allows you to deploy your models in a cost-effective way, as you can use your own instances or autoscaling groups, and you only pay for the infrastructure costs.

4. On-Premise: If your organization has the necessary infrastructure and expertise, deploying machine learning models on-premise could be a more cost-effective option than using cloud services.

5. Hybrid: A hybrid approach that combines on-premise and cloud-based deployment can also be a cost-effective option. For example, you could use on-premise resources for training and development, and then deploy the final models to the cloud for serving.

It's important to note that, when it comes to cost-effectiveness, you need to consider not only the cost of the service but also the cost of maintaining and troubleshooting your models, as well as the cost of data transfer and storage. Therefore, It's essential to evaluate the total cost of ownership (TCO) of each option and consider all these factors when making a decision.
