[![npm version](https://badge.fury.io/js/cdk-image-pipeline.svg)](https://badge.fury.io/js/cdk-image-pipeline)
[![PyPI version](https://badge.fury.io/py/cdk-image-pipeline.svg)](https://badge.fury.io/py/cdk-image-pipeline)
[![GitHub version](https://badge.fury.io/gh/aws-samples%2Fcdk-image-pipeline.svg)](https://badge.fury.io/gh/aws-samples%2Fcdk-image-pipeline)

# CDK Image Pipeline

---

L3 construct that can be used to quickly deploy a complete EC2 Image Builder Image Pipeline.

This construct creates the required infrastructure for an Image Pipeline:

- Infrastructure configuration which specifies the infrastructure within which to build and test your EC2 Image Builder image.

- An instance profile associated with the infrastructure configuration

- An EC2 Image Builder recipe defines the base image to use as your starting point to create a new image, along with the set of components that you add to customize your image and verify that everything is working as expected.

- Image Builder uses the AWS Task Orchestrator and Executor (AWSTOE) component management application to orchestrate complex workflows. AWSTOE components are based on YAML documents that define the scripts to customize or test your image. Support for multiple components.

- Image Builder image pipelines provide an automation framework for creating and maintaining custom AMIs and container images.

## Install

---

NPM install:

```sh
npm install cdk-image-pipeline
````

PyPi install:

```sh
pip install cdk-image-pipeline
```

## Usage

---

```typescript
import { ImagePipeline } from 'cdk-image-pipeline'
import { Construct } from 'constructs';

// ...
// Create a new image pipeline with the required properties
new ImagePipeline(this, "MyImagePipeline", {
    components: [
      {
        document: 'component_example.yml',
        name: 'Component',
        version: '0.0.1',
      },
      {
        document: 'component_example_2.yml',
        name: 'Component2',
        version: '0.1.0',
      },
    ],
    parentImage: 'ami-0e1d30f2c40c4c701',
    ebsVolumeConfigurations: [
        {
            deviceName: '/dev/xvda',
            ebs: {
                encrypted: true,
                iops: 200,
                kmsKeyId: 'alias/app1/key',
                volumeSize: 20,
                volumeType: 'gp3',
                throughput: 1000,
            },
        },
    ],
})
// ...
```

By default, the infrastructure configuration will deploy EC2 instances for the build/test phases into a default VPC using the default security group. If you want to control where the instances are launched, you can specify an existing VPC `SubnetID` and a list of `SecurityGroupIds`. In the example below, a new VPC is created and referenced in the `ImagePipeline` construct object.

```typescript
import { ImagePipeline } from 'cdk-image-pipeline'
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

// ...
// create a new VPC
const vpc = new ec2.Vpc(this, "Vpc", {
    cidr: "10.0.0.0/16",
    maxAzs: 2,
    subnetConfiguration: [
        {
            cidrMask: 24,
            name: 'ingress',
            subnetType: ec2.SubnetType.PUBLIC,
        },
        {
            cidrMask: 24,
            name: 'imagebuilder',
            subnetType: ec2.SubnetType.PRIVATE_WITH_NAT,
        },
    ]
});

// create a new security group within the VPC
const sg = new ec2.SecurityGroup(this, "SecurityGroup", {
    vpc:vpc,
});

// get the private subnet from the vpc
const private_subnet = vpc.privateSubnets;


new ImagePipeline(this, "MyImagePipeline", {
    components: [
      {
        document: 'component_example.yml',
        name: 'Component',
        version: '0.0.1',
      },
      {
        document: 'component_example_2.yml',
        name: 'Component2',
        version: '0.1.0',
      },
    ],
    parentImage: 'ami-0e1d30f2c40c4c701',
    securityGroups: [sg.securityGroupId],
    subnetId: private_subnet[0].subnetId,
})
// ...
```

Python usage:

```python
from cdk_image_pipeline import ImagePipeline
from constructs import Construct

# ...
image_pipeline = ImagePipeline(
    self,
    "LatestImagePipeline",
    components=[
      {
        document: 'component_example.yml',
        name: 'Component',
        version: '0.0.1',
      },
      {
        document: 'component_example_2.yml',
        name: 'Component2',
        version: '0.1.0',
      },
    ],
    parent_image="ami-0e1d30f2c40c4c701",
)
# ...
```

```python
from aws_cdk import (
    # Duration,
    Stack,
    aws_ec2 as ec2,
)
from constructs import Construct
from cdk_image_pipeline import ImagePipeline

# ...
# create a new VPC
vpc = ec2.Vpc(
    self,
    "MyVpcForImageBuilder",
    cidr="10.0.0.0/16",
    max_azs=2,
    subnet_configuration=[
        ec2.SubnetConfiguration(
            name="Ingress",
            subnet_type=ec2.SubnetType.PUBLIC,
            cidr_mask=24,
        ),
        ec2.SubnetConfiguration(
            name="ImageBuilder", subnet_type=ec2.SubnetType.PRIVATE_WITH_NAT, cidr_mask=24
        ),
    ],
)

# create a new security group within the VPC
sg = ec2.SecurityGroup(self, "SG", vpc=vpc)

# get the private subnet from the vpc
priv_subnets = vpc.private_subnets


image_pipeline = ImagePipeline(
    self,
    "LatestImagePipeline",
    components=[
      {
        document: 'component_example.yml',
        name: 'Component',
        version: '0.0.1',
      },
      {
        document: 'component_example_2.yml',
        name: 'Component2',
        version: '0.1.0',
      },
    ],
    parent_image="ami-0e1d30f2c40c4c701",
    security_groups=[sg.security_group_id],
    subnet_id=priv_subnets[0].subnet_id
)
# ...
```


### Component Documents

---

Image Builder uses the AWS Task Orchestrator and Executor (AWSTOE) component management application to orchestrate complex workflows. AWSTOE components are based on YAML documents that define the scripts to customize or test your image.

You must provide a [component document](https://docs.aws.amazon.com/imagebuilder/latest/userguide/manage-components.html) in YAML to the `ImagePipeline` construct. See the example document below:

```yaml
name: MyComponentDocument
description: This is an example component document
schemaVersion: 1.0

phases:
  - name: build
    steps:
      - name: InstallUpdates
        action: UpdateOS
  - name: validate
    steps:
      - name: HelloWorldStep
        action: ExecuteBash
        inputs:
          commands:
            - echo "Hello World! Validate."
  - name: test
    steps:
      - name: HelloWorldStep
        action: ExecuteBash
        inputs:
          commands:
            - echo "Hello World! Test.
```

### Multiple Components

To specify multiple components, add additional component documents to the `componentDoucments` property. You can also add the names and versions of these components via the `componentNames` and `componentVersions` properties (_See usage examples above_). The components will be associated to the Image Recipe that gets created as part of the construct.

Be sure to update the `imageRecipeVersion` property when making updates to your components after your initial deployment.

### SNS Encryption using KMS

---

Specify a KMS Key via the `kmsKey` property which will be used to encrypt the SNS topic.

### Infrastructure Configuration Instance Types

---

[Infrastructure configuration](https://docs.aws.amazon.com/imagebuilder/latest/userguide/manage-infra-config.html) contain settings for building and testing your EC2 Image Builder image. This construct allows you to specify a list of instance types you wish to use via the `instanceTypes` property. The default is: `['t3.medium', 'm5.large', 'm5.xlarge']`.

## Additional API notes

---

[API Reference](API.md)
