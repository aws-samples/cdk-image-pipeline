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
| <code><a href="#cdk-image-pipeline.ImagePipeline.property.imageRecipeComponents">imageRecipeComponents</a></code> | <code>aws-cdk-lib.aws_imagebuilder.CfnImageRecipe.ComponentConfigurationProperty[]</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-image-pipeline.ImagePipeline.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `imageRecipeComponents`<sup>Required</sup> <a name="imageRecipeComponents" id="cdk-image-pipeline.ImagePipeline.property.imageRecipeComponents"></a>

```typescript
public readonly imageRecipeComponents: ComponentConfigurationProperty[];
```

- *Type:* aws-cdk-lib.aws_imagebuilder.CfnImageRecipe.ComponentConfigurationProperty[]

---


## Structs <a name="Structs" id="Structs"></a>

### ImagePipelineProps <a name="ImagePipelineProps" id="cdk-image-pipeline.ImagePipelineProps"></a>

#### Initializer <a name="Initializer" id="cdk-image-pipeline.ImagePipelineProps.Initializer"></a>

```typescript
import { ImagePipelineProps } from 'cdk-image-pipeline'

const imagePipelineProps: ImagePipelineProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-image-pipeline.ImagePipelineProps.property.componentDocuments">componentDocuments</a></code> | <code>string[]</code> | Relative path to Image Builder component documents. |
| <code><a href="#cdk-image-pipeline.ImagePipelineProps.property.componentNames">componentNames</a></code> | <code>string[]</code> | Names of the Component Documents. |
| <code><a href="#cdk-image-pipeline.ImagePipelineProps.property.componentVersions">componentVersions</a></code> | <code>string[]</code> | Versions for each component document. |
| <code><a href="#cdk-image-pipeline.ImagePipelineProps.property.imageRecipe">imageRecipe</a></code> | <code>string</code> | Name of the Image Recipe. |
| <code><a href="#cdk-image-pipeline.ImagePipelineProps.property.infraConfigName">infraConfigName</a></code> | <code>string</code> | Name of the Infrastructure Configuration for Image Builder. |
| <code><a href="#cdk-image-pipeline.ImagePipelineProps.property.kmsKeyAlias">kmsKeyAlias</a></code> | <code>string</code> | KMS Key used to encrypt the SNS topic. |
| <code><a href="#cdk-image-pipeline.ImagePipelineProps.property.parentImage">parentImage</a></code> | <code>string</code> | The source (parent) image that the image recipe uses as its base environment. |
| <code><a href="#cdk-image-pipeline.ImagePipelineProps.property.pipelineName">pipelineName</a></code> | <code>string</code> | Name of the Image Pipeline. |
| <code><a href="#cdk-image-pipeline.ImagePipelineProps.property.profileName">profileName</a></code> | <code>string</code> | Name of the instance profile that will be associated with the Instance Configuration. |
| <code><a href="#cdk-image-pipeline.ImagePipelineProps.property.additionalPolicies">additionalPolicies</a></code> | <code>aws-cdk-lib.aws_iam.ManagedPolicy[]</code> | Additional policies to add to the instance profile associated with the Instance Configurations. |
| <code><a href="#cdk-image-pipeline.ImagePipelineProps.property.ebsVolumeConfiguration">ebsVolumeConfiguration</a></code> | <code>aws-cdk-lib.aws_imagebuilder.CfnImageRecipe.EbsInstanceBlockDeviceSpecificationProperty</code> | Configuration for the AMI's EBS volume. |
| <code><a href="#cdk-image-pipeline.ImagePipelineProps.property.email">email</a></code> | <code>string</code> | Email used to receive Image Builder Pipeline Notifications via SNS. |
| <code><a href="#cdk-image-pipeline.ImagePipelineProps.property.imageRecipeVersion">imageRecipeVersion</a></code> | <code>string</code> | Image recipe version (Default: 0.0.1). |
| <code><a href="#cdk-image-pipeline.ImagePipelineProps.property.instanceTypes">instanceTypes</a></code> | <code>string[]</code> | List of instance types used in the Instance Configuration (Default: [ 't3.medium', 'm5.large', 'm5.xlarge' ]). |
| <code><a href="#cdk-image-pipeline.ImagePipelineProps.property.platform">platform</a></code> | <code>string</code> | Platform type Linux or Windows (Default: Linux). |
| <code><a href="#cdk-image-pipeline.ImagePipelineProps.property.securityGroups">securityGroups</a></code> | <code>string[]</code> | List of security group IDs for the Infrastructure Configuration. |
| <code><a href="#cdk-image-pipeline.ImagePipelineProps.property.subnetId">subnetId</a></code> | <code>string</code> | Subnet ID for the Infrastructure Configuration. |
| <code><a href="#cdk-image-pipeline.ImagePipelineProps.property.userDataScript">userDataScript</a></code> | <code>string</code> | UserData script that will override default one (if specified). |

---

##### `componentDocuments`<sup>Required</sup> <a name="componentDocuments" id="cdk-image-pipeline.ImagePipelineProps.property.componentDocuments"></a>

```typescript
public readonly componentDocuments: string[];
```

- *Type:* string[]

Relative path to Image Builder component documents.

---

##### `componentNames`<sup>Required</sup> <a name="componentNames" id="cdk-image-pipeline.ImagePipelineProps.property.componentNames"></a>

```typescript
public readonly componentNames: string[];
```

- *Type:* string[]

Names of the Component Documents.

---

##### `componentVersions`<sup>Required</sup> <a name="componentVersions" id="cdk-image-pipeline.ImagePipelineProps.property.componentVersions"></a>

```typescript
public readonly componentVersions: string[];
```

- *Type:* string[]

Versions for each component document.

---

##### `imageRecipe`<sup>Required</sup> <a name="imageRecipe" id="cdk-image-pipeline.ImagePipelineProps.property.imageRecipe"></a>

```typescript
public readonly imageRecipe: string;
```

- *Type:* string

Name of the Image Recipe.

---

##### `infraConfigName`<sup>Required</sup> <a name="infraConfigName" id="cdk-image-pipeline.ImagePipelineProps.property.infraConfigName"></a>

```typescript
public readonly infraConfigName: string;
```

- *Type:* string

Name of the Infrastructure Configuration for Image Builder.

---

##### `kmsKeyAlias`<sup>Required</sup> <a name="kmsKeyAlias" id="cdk-image-pipeline.ImagePipelineProps.property.kmsKeyAlias"></a>

```typescript
public readonly kmsKeyAlias: string;
```

- *Type:* string

KMS Key used to encrypt the SNS topic.

Enter an existing KMS Key Alias in your target account/region.

---

##### `parentImage`<sup>Required</sup> <a name="parentImage" id="cdk-image-pipeline.ImagePipelineProps.property.parentImage"></a>

```typescript
public readonly parentImage: string;
```

- *Type:* string

The source (parent) image that the image recipe uses as its base environment.

The value can be the parent image ARN or an Image Builder AMI ID

---

##### `pipelineName`<sup>Required</sup> <a name="pipelineName" id="cdk-image-pipeline.ImagePipelineProps.property.pipelineName"></a>

```typescript
public readonly pipelineName: string;
```

- *Type:* string

Name of the Image Pipeline.

---

##### `profileName`<sup>Required</sup> <a name="profileName" id="cdk-image-pipeline.ImagePipelineProps.property.profileName"></a>

```typescript
public readonly profileName: string;
```

- *Type:* string

Name of the instance profile that will be associated with the Instance Configuration.

---

##### `additionalPolicies`<sup>Optional</sup> <a name="additionalPolicies" id="cdk-image-pipeline.ImagePipelineProps.property.additionalPolicies"></a>

```typescript
public readonly additionalPolicies: ManagedPolicy[];
```

- *Type:* aws-cdk-lib.aws_iam.ManagedPolicy[]

Additional policies to add to the instance profile associated with the Instance Configurations.

---

##### `ebsVolumeConfiguration`<sup>Optional</sup> <a name="ebsVolumeConfiguration" id="cdk-image-pipeline.ImagePipelineProps.property.ebsVolumeConfiguration"></a>

```typescript
public readonly ebsVolumeConfiguration: EbsInstanceBlockDeviceSpecificationProperty;
```

- *Type:* aws-cdk-lib.aws_imagebuilder.CfnImageRecipe.EbsInstanceBlockDeviceSpecificationProperty

Configuration for the AMI's EBS volume.

---

##### `email`<sup>Optional</sup> <a name="email" id="cdk-image-pipeline.ImagePipelineProps.property.email"></a>

```typescript
public readonly email: string;
```

- *Type:* string

Email used to receive Image Builder Pipeline Notifications via SNS.

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



