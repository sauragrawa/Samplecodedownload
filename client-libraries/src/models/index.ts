import * as coreClient from "@azure/core-client";

export interface Dog {
  /** The dog's name */
  name: string;
  /** Whether the dog wags their tail when happy */
  wagsTailWhenHappy?: boolean;
}

export interface ErrorModel {
  status?: number;
  message?: string;
}

export interface Cat {
  likesMilk?: boolean;
}

export interface Kitten extends Cat {
  eatsMiceYet?: boolean;
}

/** Optional parameters. */
export interface GetDogOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the getDog operation. */
export type GetDogResponse = Dog;

/** Optional parameters. */
export interface PutCatOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the putCat operation. */
export type PutCatResponse = {
  /** The parsed response body. */
  body: string;
};

/** Optional parameters. */
export interface PostKittenOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the postKitten operation. */
export type PostKittenResponse = {
  /** The parsed response body. */
  body: string;
};

/** Optional parameters. */
export interface PetClientOptionalParams
  extends coreClient.ServiceClientOptions {
  /** server parameter */
  $host?: string;
  /** Overrides client endpoint. */
  endpoint?: string;
}
