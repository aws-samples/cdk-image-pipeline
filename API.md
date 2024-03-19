# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### ImagePipeline <a name="ImagePipeline" id="cdk-image-pipeline.ImagePipeline"></a>

#### Initializers <a name="Initializers" id="cdk-image-pipeline.ImagePipeline.Initializer"></a>

```typescript
import { ImagePipeline } from 'cdk-image-pipeline'

new ImagePipeline(scope: Construct, id: string, props: ImagePipelineProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-image-pipeline.ImagePipeline.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-image-pipeline.ImagePipeline.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-image-pipeline.ImagePipeline.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-image-pipeline.ImagePipelineProps">ImagePipelineProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-image-pipeline.ImagePipeline.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-image-pipeline.ImagePipeline.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-image-pipeline.ImagePipeline.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-image-pipeline.ImagePipelineProps">ImagePipelineProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-image-pipeline.ImagePipeline.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk-image-pipeline.ImagePipeline.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-image-pipeline.ImagePipeline.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="cdk-image-pipeline.ImagePipeline.isConstruct"></a>

```typescript
import { ImagePipeline } from 'cdk-image-pipeline'

ImagePipeline.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="cdk-image-pipeline.ImagePipeline.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-image-pipeline.ImagePipeline.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-image-pipeline.ImagePipeline.property.builderSnsTopic">builderSnsTopic</a></code> | <code>aws-cdk-lib.aws_sns.Topic</code> | SNS Topic where the internal ImageBuilder will notify about new builds. |
| <code><a href="#cdk-image-pipeline.ImagePipeline.property.pipeline">pipeline</a></code> | <code>aws-cdk-lib.aws_imagebuilder.CfnImagePipeline</code> | The internal image pipeline created by this construct. |
| <code><a href="#cdk-image-pipeline.ImagePipeline.property.imageRecipeComponents">imageRecipeComponents</a></code> | <code>aws-cdk-lib.aws_imagebuilder.CfnImageRecipe.ComponentConfigurationProperty[]</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-image-pipeline.ImagePipeline.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `builderSnsTopic`<sup>Required</sup> <a name="builderSnsTopic" id="cdk-image-pipeline.ImagePipeline.property.builderSnsTopic"></a>

```typescript
public readonly builderSnsTopic: Topic;
```

- *Type:* aws-cdk-lib.aws_sns.Topic

SNS Topic where the internal ImageBuilder will notify about new builds.

---

##### `pipeline`<sup>Required</sup> <a name="pipeline" id="cdk-image-pipeline.ImagePipeline.property.pipeline"></a>

```typescript
public readonly pipeline: CfnImagePipeline;
```

- *Type:* aws-cdk-lib.aws_imagebuilder.CfnImagePipeline

The internal image pipeline created by this construct.

---

##### `imageRecipeComponents`<sup>Required</sup> <a name="imageRecipeComponents" id="cdk-image-pipeline.ImagePipeline.property.imageRecipeComponents"></a>

```typescript
public readonly imageRecipeComponents: ComponentConfigurationProperty[];
```

- *Type:* aws-cdk-lib.aws_imagebuilder.CfnImageRecipe.ComponentConfigurationProperty[]

---


## Structs <a name="Structs" id="Structs"></a>

### ComponentProps <a name="ComponentProps" id="cdk-image-pipeline.ComponentProps"></a>

#### Initializer <a name="Initializer" id="cdk-image-pipeline.ComponentProps.Initializer"></a>

```typescript
import { ComponentProps } from 'cdk-image-pipeline'

const componentProps: ComponentProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-image-pipeline.ComponentProps.property.document">document</a></code> | <code>string</code> | Relative path to Image Builder component document. |
| <code><a href="#cdk-image-pipeline.ComponentProps.property.name">name</a></code> | <code>string</code> | Name of the Component Document. |
| <code><a href="#cdk-image-pipeline.ComponentProps.property.version">version</a></code> | <code>string</code> | Version for each component document. |

---

##### `document`<sup>Required</sup> <a name="document" id="cdk-image-pipeline.ComponentProps.property.document"></a>

```typescript
public readonly document: string;
```

- *Type:* string

Relative path to Image Builder component document.

---

##### `name`<sup>Required</sup> <a name="name" id="cdk-image-pipeline.ComponentProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

Name of the Component Document.

---

##### `version`<sup>Required</sup> <a name="version" id="cdk-image-pipeline.ComponentProps.property.version"></a>

```typescript
public readonly version: string;
```

- *Type:* string

Version for each component document.

---

### ImagePipelineProps <a name="ImagePipelineProps" id="cdk-image-pipeline.ImagePipelineProps"></a>

#### Initializer <a name="Initializer" id="cdk-image-pipeline.ImagePipelineProps.Initializer"></a>

```typescript
import { ImagePipelineProps } from 'cdk-image-pipeline'

const imagePipelineProps: ImagePipelineProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-image-pipeline.ImagePipelineProps.property.components">components</a></code> | <code>string \| <a href="#cdk-image-pipeline.ComponentProps">ComponentProps</a>[]</code> | List of component props. |
| <code><a href="#cdk-image-pipeline.ImagePipelineProps.property.parentImage">parentImage</a></code> | <code>string</code> | The source (parent) image that the image recipe uses as its base environment. |
| <code><a href="#cdk-image-pipeline.ImagePipelineProps.property.additionalPolicies">additionalPolicies</a></code> | <code>aws-cdk-lib.aws_iam.ManagedPolicy[]</code> | Additional policies to add to the instance profile associated with the Instance Configurations. |
| <code><a href="#cdk-image-pipeline.ImagePipelineProps.property.amiIdSsmAccountId">amiIdSsmAccountId</a></code> | <code>string</code> | Account ID for Parameter Store path above. |
| <code><a href="#cdk-image-pipeline.ImagePipelineProps.property.amiIdSsmPath">amiIdSsmPath</a></code> | <code>string</code> | Parameter Store path to store latest AMI ID under. |
| <code><a href="#cdk-image-pipeline.ImagePipelineProps.property.amiIdSsmRegion">amiIdSsmRegion</a></code> | <code>string</code> | Region for Parameter Store path above. |
| <code><a href="#cdk-image-pipeline.ImagePipelineProps.property.distributionAccountIDs">distributionAccountIDs</a></code> | <code>string[]</code> | List of accounts to copy this AMI to, if the option to do so is enabled. |
| <code><a href="#cdk-image-pipeline.ImagePipelineProps.property.distributionRegions">distributionRegions</a></code> | <code>string[]</code> | List of regions to copy this AMI to, if the option to do so is enabled. |
| <code><a href="#cdk-image-pipeline.ImagePipelineProps.property.ebsVolumeConfigurations">ebsVolumeConfigurations</a></code> | <code><a href="#cdk-image-pipeline.VolumeProps">VolumeProps</a>[]</code> | Configuration for the AMI's EBS volumes. |
| <code><a href="#cdk-image-pipeline.ImagePipelineProps.property.email">email</a></code> | <code>string</code> | Email used to receive Image Builder Pipeline Notifications via SNS. |
| <code><a href="#cdk-image-pipeline.ImagePipelineProps.property.enableCrossAccountDistribution">enableCrossAccountDistribution</a></code> | <code>boolean</code> | Set to true if you want to copy this AMI to other accounts using a Distribution Configuration. |
| <code><a href="#cdk-image-pipeline.ImagePipelineProps.property.enableVulnScans">enableVulnScans</a></code> | <code>boolean</code> | Set to true if you want to enable continuous vulnerability scans through AWS Inpector. |
| <code><a href="#cdk-image-pipeline.ImagePipelineProps.property.imageRecipeVersion">imageRecipeVersion</a></code> | <code>string</code> | Image recipe version (Default: 0.0.1). |
| <code><a href="#cdk-image-pipeline.ImagePipelineProps.property.instanceTypes">instanceTypes</a></code> | <code>string[]</code> | List of instance types used in the Instance Configuration (Default: [ 't3.medium', 'm5.large', 'm5.xlarge' ]). |
| <code><a href="#cdk-image-pipeline.ImagePipelineProps.property.kmsKey">kmsKey</a></code> | <code>aws-cdk-lib.aws_kms.IKey</code> | KMS Key used to encrypt the SNS topic. |
| <code><a href="#cdk-image-pipeline.ImagePipelineProps.property.platform">platform</a></code> | <code>string</code> | Platform type Linux or Windows (Default: Linux). |
| <code><a href="#cdk-image-pipeline.ImagePipelineProps.property.securityGroups">securityGroups</a></code> | <code>string[]</code> | List of security group IDs for the Infrastructure Configuration. |
| <code><a href="#cdk-image-pipeline.ImagePipelineProps.property.subnetId">subnetId</a></code> | <code>string</code> | Subnet ID for the Infrastructure Configuration. |
| <code><a href="#cdk-image-pipeline.ImagePipelineProps.property.userDataScript">userDataScript</a></code> | <code>string</code> | UserData script that will override default one (if specified). |
| <code><a href="#cdk-image-pipeline.ImagePipelineProps.property.vulnScansRepoName">vulnScansRepoName</a></code> | <code>string</code> | Store vulnerability scans through AWS Inpsector in ECR using this repo name (if option is enabled). |
| <code><a href="#cdk-image-pipeline.ImagePipelineProps.property.vulnScansRepoTags">vulnScansRepoTags</a></code> | <code>string[]</code> | Store vulnerability scans through AWS Inpsector in ECR using these image tags (if option is enabled). |

---

##### `components`<sup>Required</sup> <a name="components" id="cdk-image-pipeline.ImagePipelineProps.property.components"></a>

```typescript
public readonly components: string | ComponentProps[];
```

- *Type:* string | <a href="#cdk-image-pipeline.ComponentProps">ComponentProps</a>[]

List of component props.

---

##### `parentImage`<sup>Required</sup> <a name="parentImage" id="cdk-image-pipeline.ImagePipelineProps.property.parentImage"></a>

```typescript
public readonly parentImage: string;
```

- *Type:* string

The source (parent) image that the image recipe uses as its base environment.

The value can be the parent image ARN or an Image Builder AMI ID

---

##### `additionalPolicies`<sup>Optional</sup> <a name="additionalPolicies" id="cdk-image-pipeline.ImagePipelineProps.property.additionalPolicies"></a>

```typescript
public readonly additionalPolicies: ManagedPolicy[];
```

- *Type:* aws-cdk-lib.aws_iam.ManagedPolicy[]

Additional policies to add to the instance profile associated with the Instance Configurations.

---

##### `amiIdSsmAccountId`<sup>Optional</sup> <a name="amiIdSsmAccountId" id="cdk-image-pipeline.ImagePipelineProps.property.amiIdSsmAccountId"></a>

```typescript
public readonly amiIdSsmAccountId: string;
```

- *Type:* string

Account ID for Parameter Store path above.

---

##### `amiIdSsmPath`<sup>Optional</sup> <a name="amiIdSsmPath" id="cdk-image-pipeline.ImagePipelineProps.property.amiIdSsmPath"></a>

```typescript
public readonly amiIdSsmPath: string;
```

- *Type:* string

Parameter Store path to store latest AMI ID under.

---

##### `amiIdSsmRegion`<sup>Optional</sup> <a name="amiIdSsmRegion" id="cdk-image-pipeline.ImagePipelineProps.property.amiIdSsmRegion"></a>

```typescript
public readonly amiIdSsmRegion: string;
```

- *Type:* string

Region for Parameter Store path above.

---

##### `distributionAccountIDs`<sup>Optional</sup> <a name="distributionAccountIDs" id="cdk-image-pipeline.ImagePipelineProps.property.distributionAccountIDs"></a>

```typescript
public readonly distributionAccountIDs: string[];
```

- *Type:* string[]

List of accounts to copy this AMI to, if the option to do so is enabled.

---

##### `distributionRegions`<sup>Optional</sup> <a name="distributionRegions" id="cdk-image-pipeline.ImagePipelineProps.property.distributionRegions"></a>

```typescript
public readonly distributionRegions: string[];
```

- *Type:* string[]

List of regions to copy this AMI to, if the option to do so is enabled.

---

##### `ebsVolumeConfigurations`<sup>Optional</sup> <a name="ebsVolumeConfigurations" id="cdk-image-pipeline.ImagePipelineProps.property.ebsVolumeConfigurations"></a>

```typescript
public readonly ebsVolumeConfigurations: VolumeProps[];
```

- *Type:* <a href="#cdk-image-pipeline.VolumeProps">VolumeProps</a>[]

Configuration for the AMI's EBS volumes.

---

##### `email`<sup>Optional</sup> <a name="email" id="cdk-image-pipeline.ImagePipelineProps.property.email"></a>

```typescript
public readonly email: string;
```

- *Type:* string

Email used to receive Image Builder Pipeline Notifications via SNS.

---

##### `enableCrossAccountDistribution`<sup>Optional</sup> <a name="enableCrossAccountDistribution" id="cdk-image-pipeline.ImagePipelineProps.property.enableCrossAccountDistribution"></a>

```typescript
public readonly enableCrossAccountDistribution: boolean;
```

- *Type:* boolean

Set to true if you want to copy this AMI to other accounts using a Distribution Configuration.

---

##### `enableVulnScans`<sup>Optional</sup> <a name="enableVulnScans" id="cdk-image-pipeline.ImagePipelineProps.property.enableVulnScans"></a>

```typescript
public readonly enableVulnScans: boolean;
```

- *Type:* boolean

Set to true if you want to enable continuous vulnerability scans through AWS Inpector.

---

##### `imageRecipeVersion`<sup>Optional</sup> <a name="imageRecipeVersion" id="cdk-image-pipeline.ImagePipelineProps.property.imageRecipeVersion"></a>

```typescript
public readonly imageRecipeVersion: string;
```

- *Type:* string

Image recipe version (Default: 0.0.1).

---

##### `instanceTypes`<sup>Optional</sup> <a name="instanceTypes" id="cdk-image-pipeline.ImagePipelineProps.property.instanceTypes"></a>

```typescript
public readonly instanceTypes: string[];
```

- *Type:* string[]

List of instance types used in the Instance Configuration (Default: [ 't3.medium', 'm5.large', 'm5.xlarge' ]).

---

##### `kmsKey`<sup>Optional</sup> <a name="kmsKey" id="cdk-image-pipeline.ImagePipelineProps.property.kmsKey"></a>

```typescript
public readonly kmsKey: IKey;
```

- *Type:* aws-cdk-lib.aws_kms.IKey

KMS Key used to encrypt the SNS topic.

---

##### `platform`<sup>Optional</sup> <a name="platform" id="cdk-image-pipeline.ImagePipelineProps.property.platform"></a>

```typescript
public readonly platform: string;
```

- *Type:* string

Platform type Linux or Windows (Default: Linux).

---

##### `securityGroups`<sup>Optional</sup> <a name="securityGroups" id="cdk-image-pipeline.ImagePipelineProps.property.securityGroups"></a>

```typescript
public readonly securityGroups: string[];
```

- *Type:* string[]

List of security group IDs for the Infrastructure Configuration.

---

##### `subnetId`<sup>Optional</sup> <a name="subnetId" id="cdk-image-pipeline.ImagePipelineProps.property.subnetId"></a>

```typescript
public readonly subnetId: string;
```

- *Type:* string

Subnet ID for the Infrastructure Configuration.

---

##### `userDataScript`<sup>Optional</sup> <a name="userDataScript" id="cdk-image-pipeline.ImagePipelineProps.property.userDataScript"></a>

```typescript
public readonly userDataScript: string;
```

- *Type:* string
- *Default:* none

UserData script that will override default one (if specified).

---

##### `vulnScansRepoName`<sup>Optional</sup> <a name="vulnScansRepoName" id="cdk-image-pipeline.ImagePipelineProps.property.vulnScansRepoName"></a>

```typescript
public readonly vulnScansRepoName: string;
```

- *Type:* string

Store vulnerability scans through AWS Inpsector in ECR using this repo name (if option is enabled).

---

##### `vulnScansRepoTags`<sup>Optional</sup> <a name="vulnScansRepoTags" id="cdk-image-pipeline.ImagePipelineProps.property.vulnScansRepoTags"></a>

```typescript
public readonly vulnScansRepoTags: string[];
```

- *Type:* string[]

Store vulnerability scans through AWS Inpsector in ECR using these image tags (if option is enabled).

---

### VolumeProps <a name="VolumeProps" id="cdk-image-pipeline.VolumeProps"></a>

#### Initializer <a name="Initializer" id="cdk-image-pipeline.VolumeProps.Initializer"></a>

```typescript
import { VolumeProps } from 'cdk-image-pipeline'

const volumeProps: VolumeProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-image-pipeline.VolumeProps.property.deviceName">deviceName</a></code> | <code>string</code> | Name of the volume. |
| <code><a href="#cdk-image-pipeline.VolumeProps.property.ebs">ebs</a></code> | <code>aws-cdk-lib.aws_imagebuilder.CfnImageRecipe.EbsInstanceBlockDeviceSpecificationProperty</code> | EBS Block Store Parameters. |

---

##### `deviceName`<sup>Required</sup> <a name="deviceName" id="cdk-image-pipeline.VolumeProps.property.deviceName"></a>

```typescript
public readonly deviceName: string;
```

- *Type:* string

Name of the volume.

---

##### `ebs`<sup>Required</sup> <a name="ebs" id="cdk-image-pipeline.VolumeProps.property.ebs"></a>

```typescript
public readonly ebs: EbsInstanceBlockDeviceSpecificationProperty;
```

- *Type:* aws-cdk-lib.aws_imagebuilder.CfnImageRecipe.EbsInstanceBlockDeviceSpecificationProperty

EBS Block Store Parameters.

---



