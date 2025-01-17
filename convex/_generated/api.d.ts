/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as functions_createGitHubRepo from "../functions/createGitHubRepo.js";
import type * as functions_storeGitHubToken from "../functions/storeGitHubToken.js";
import type * as users from "../users.js";
import type * as workspace from "../workspace.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "functions/createGitHubRepo": typeof functions_createGitHubRepo;
  "functions/storeGitHubToken": typeof functions_storeGitHubToken;
  users: typeof users;
  workspace: typeof workspace;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
