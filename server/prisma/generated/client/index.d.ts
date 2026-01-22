
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Branch
 * 
 */
export type Branch = $Result.DefaultSelection<Prisma.$BranchPayload>
/**
 * Model Region
 * 
 */
export type Region = $Result.DefaultSelection<Prisma.$RegionPayload>
/**
 * Model Division
 * 
 */
export type Division = $Result.DefaultSelection<Prisma.$DivisionPayload>
/**
 * Model Designation
 * 
 */
export type Designation = $Result.DefaultSelection<Prisma.$DesignationPayload>
/**
 * Model Campaign
 * 
 */
export type Campaign = $Result.DefaultSelection<Prisma.$CampaignPayload>
/**
 * Model Document
 * 
 */
export type Document = $Result.DefaultSelection<Prisma.$DocumentPayload>
/**
 * Model BranchSurvey
 * 
 */
export type BranchSurvey = $Result.DefaultSelection<Prisma.$BranchSurveyPayload>
/**
 * Model BankConfig
 * 
 */
export type BankConfig = $Result.DefaultSelection<Prisma.$BankConfigPayload>
/**
 * Model InterestRate
 * 
 */
export type InterestRate = $Result.DefaultSelection<Prisma.$InterestRatePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.branch`: Exposes CRUD operations for the **Branch** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Branches
    * const branches = await prisma.branch.findMany()
    * ```
    */
  get branch(): Prisma.BranchDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.region`: Exposes CRUD operations for the **Region** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Regions
    * const regions = await prisma.region.findMany()
    * ```
    */
  get region(): Prisma.RegionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.division`: Exposes CRUD operations for the **Division** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Divisions
    * const divisions = await prisma.division.findMany()
    * ```
    */
  get division(): Prisma.DivisionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.designation`: Exposes CRUD operations for the **Designation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Designations
    * const designations = await prisma.designation.findMany()
    * ```
    */
  get designation(): Prisma.DesignationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.campaign`: Exposes CRUD operations for the **Campaign** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Campaigns
    * const campaigns = await prisma.campaign.findMany()
    * ```
    */
  get campaign(): Prisma.CampaignDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.document`: Exposes CRUD operations for the **Document** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Documents
    * const documents = await prisma.document.findMany()
    * ```
    */
  get document(): Prisma.DocumentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.branchSurvey`: Exposes CRUD operations for the **BranchSurvey** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BranchSurveys
    * const branchSurveys = await prisma.branchSurvey.findMany()
    * ```
    */
  get branchSurvey(): Prisma.BranchSurveyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bankConfig`: Exposes CRUD operations for the **BankConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BankConfigs
    * const bankConfigs = await prisma.bankConfig.findMany()
    * ```
    */
  get bankConfig(): Prisma.BankConfigDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.interestRate`: Exposes CRUD operations for the **InterestRate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InterestRates
    * const interestRates = await prisma.interestRate.findMany()
    * ```
    */
  get interestRate(): Prisma.InterestRateDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.2.0
   * Query Engine version: 0c8ef2ce45c83248ab3df073180d5eda9e8be7a3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Branch: 'Branch',
    Region: 'Region',
    Division: 'Division',
    Designation: 'Designation',
    Campaign: 'Campaign',
    Document: 'Document',
    BranchSurvey: 'BranchSurvey',
    BankConfig: 'BankConfig',
    InterestRate: 'InterestRate'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "branch" | "region" | "division" | "designation" | "campaign" | "document" | "branchSurvey" | "bankConfig" | "interestRate"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Branch: {
        payload: Prisma.$BranchPayload<ExtArgs>
        fields: Prisma.BranchFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BranchFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BranchFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>
          }
          findFirst: {
            args: Prisma.BranchFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BranchFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>
          }
          findMany: {
            args: Prisma.BranchFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>[]
          }
          create: {
            args: Prisma.BranchCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>
          }
          createMany: {
            args: Prisma.BranchCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BranchCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>[]
          }
          delete: {
            args: Prisma.BranchDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>
          }
          update: {
            args: Prisma.BranchUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>
          }
          deleteMany: {
            args: Prisma.BranchDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BranchUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BranchUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>[]
          }
          upsert: {
            args: Prisma.BranchUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>
          }
          aggregate: {
            args: Prisma.BranchAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBranch>
          }
          groupBy: {
            args: Prisma.BranchGroupByArgs<ExtArgs>
            result: $Utils.Optional<BranchGroupByOutputType>[]
          }
          count: {
            args: Prisma.BranchCountArgs<ExtArgs>
            result: $Utils.Optional<BranchCountAggregateOutputType> | number
          }
        }
      }
      Region: {
        payload: Prisma.$RegionPayload<ExtArgs>
        fields: Prisma.RegionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RegionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RegionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>
          }
          findFirst: {
            args: Prisma.RegionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RegionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>
          }
          findMany: {
            args: Prisma.RegionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>[]
          }
          create: {
            args: Prisma.RegionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>
          }
          createMany: {
            args: Prisma.RegionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RegionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>[]
          }
          delete: {
            args: Prisma.RegionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>
          }
          update: {
            args: Prisma.RegionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>
          }
          deleteMany: {
            args: Prisma.RegionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RegionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RegionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>[]
          }
          upsert: {
            args: Prisma.RegionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>
          }
          aggregate: {
            args: Prisma.RegionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRegion>
          }
          groupBy: {
            args: Prisma.RegionGroupByArgs<ExtArgs>
            result: $Utils.Optional<RegionGroupByOutputType>[]
          }
          count: {
            args: Prisma.RegionCountArgs<ExtArgs>
            result: $Utils.Optional<RegionCountAggregateOutputType> | number
          }
        }
      }
      Division: {
        payload: Prisma.$DivisionPayload<ExtArgs>
        fields: Prisma.DivisionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DivisionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DivisionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DivisionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DivisionPayload>
          }
          findFirst: {
            args: Prisma.DivisionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DivisionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DivisionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DivisionPayload>
          }
          findMany: {
            args: Prisma.DivisionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DivisionPayload>[]
          }
          create: {
            args: Prisma.DivisionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DivisionPayload>
          }
          createMany: {
            args: Prisma.DivisionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DivisionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DivisionPayload>[]
          }
          delete: {
            args: Prisma.DivisionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DivisionPayload>
          }
          update: {
            args: Prisma.DivisionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DivisionPayload>
          }
          deleteMany: {
            args: Prisma.DivisionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DivisionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DivisionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DivisionPayload>[]
          }
          upsert: {
            args: Prisma.DivisionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DivisionPayload>
          }
          aggregate: {
            args: Prisma.DivisionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDivision>
          }
          groupBy: {
            args: Prisma.DivisionGroupByArgs<ExtArgs>
            result: $Utils.Optional<DivisionGroupByOutputType>[]
          }
          count: {
            args: Prisma.DivisionCountArgs<ExtArgs>
            result: $Utils.Optional<DivisionCountAggregateOutputType> | number
          }
        }
      }
      Designation: {
        payload: Prisma.$DesignationPayload<ExtArgs>
        fields: Prisma.DesignationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DesignationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DesignationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignationPayload>
          }
          findFirst: {
            args: Prisma.DesignationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DesignationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignationPayload>
          }
          findMany: {
            args: Prisma.DesignationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignationPayload>[]
          }
          create: {
            args: Prisma.DesignationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignationPayload>
          }
          createMany: {
            args: Prisma.DesignationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DesignationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignationPayload>[]
          }
          delete: {
            args: Prisma.DesignationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignationPayload>
          }
          update: {
            args: Prisma.DesignationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignationPayload>
          }
          deleteMany: {
            args: Prisma.DesignationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DesignationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DesignationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignationPayload>[]
          }
          upsert: {
            args: Prisma.DesignationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignationPayload>
          }
          aggregate: {
            args: Prisma.DesignationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDesignation>
          }
          groupBy: {
            args: Prisma.DesignationGroupByArgs<ExtArgs>
            result: $Utils.Optional<DesignationGroupByOutputType>[]
          }
          count: {
            args: Prisma.DesignationCountArgs<ExtArgs>
            result: $Utils.Optional<DesignationCountAggregateOutputType> | number
          }
        }
      }
      Campaign: {
        payload: Prisma.$CampaignPayload<ExtArgs>
        fields: Prisma.CampaignFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CampaignFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CampaignFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          findFirst: {
            args: Prisma.CampaignFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CampaignFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          findMany: {
            args: Prisma.CampaignFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>[]
          }
          create: {
            args: Prisma.CampaignCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          createMany: {
            args: Prisma.CampaignCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CampaignCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>[]
          }
          delete: {
            args: Prisma.CampaignDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          update: {
            args: Prisma.CampaignUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          deleteMany: {
            args: Prisma.CampaignDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CampaignUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CampaignUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>[]
          }
          upsert: {
            args: Prisma.CampaignUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          aggregate: {
            args: Prisma.CampaignAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCampaign>
          }
          groupBy: {
            args: Prisma.CampaignGroupByArgs<ExtArgs>
            result: $Utils.Optional<CampaignGroupByOutputType>[]
          }
          count: {
            args: Prisma.CampaignCountArgs<ExtArgs>
            result: $Utils.Optional<CampaignCountAggregateOutputType> | number
          }
        }
      }
      Document: {
        payload: Prisma.$DocumentPayload<ExtArgs>
        fields: Prisma.DocumentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DocumentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DocumentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          findFirst: {
            args: Prisma.DocumentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DocumentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          findMany: {
            args: Prisma.DocumentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          create: {
            args: Prisma.DocumentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          createMany: {
            args: Prisma.DocumentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DocumentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          delete: {
            args: Prisma.DocumentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          update: {
            args: Prisma.DocumentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          deleteMany: {
            args: Prisma.DocumentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DocumentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DocumentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          upsert: {
            args: Prisma.DocumentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          aggregate: {
            args: Prisma.DocumentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDocument>
          }
          groupBy: {
            args: Prisma.DocumentGroupByArgs<ExtArgs>
            result: $Utils.Optional<DocumentGroupByOutputType>[]
          }
          count: {
            args: Prisma.DocumentCountArgs<ExtArgs>
            result: $Utils.Optional<DocumentCountAggregateOutputType> | number
          }
        }
      }
      BranchSurvey: {
        payload: Prisma.$BranchSurveyPayload<ExtArgs>
        fields: Prisma.BranchSurveyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BranchSurveyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchSurveyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BranchSurveyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchSurveyPayload>
          }
          findFirst: {
            args: Prisma.BranchSurveyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchSurveyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BranchSurveyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchSurveyPayload>
          }
          findMany: {
            args: Prisma.BranchSurveyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchSurveyPayload>[]
          }
          create: {
            args: Prisma.BranchSurveyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchSurveyPayload>
          }
          createMany: {
            args: Prisma.BranchSurveyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BranchSurveyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchSurveyPayload>[]
          }
          delete: {
            args: Prisma.BranchSurveyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchSurveyPayload>
          }
          update: {
            args: Prisma.BranchSurveyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchSurveyPayload>
          }
          deleteMany: {
            args: Prisma.BranchSurveyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BranchSurveyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BranchSurveyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchSurveyPayload>[]
          }
          upsert: {
            args: Prisma.BranchSurveyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchSurveyPayload>
          }
          aggregate: {
            args: Prisma.BranchSurveyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBranchSurvey>
          }
          groupBy: {
            args: Prisma.BranchSurveyGroupByArgs<ExtArgs>
            result: $Utils.Optional<BranchSurveyGroupByOutputType>[]
          }
          count: {
            args: Prisma.BranchSurveyCountArgs<ExtArgs>
            result: $Utils.Optional<BranchSurveyCountAggregateOutputType> | number
          }
        }
      }
      BankConfig: {
        payload: Prisma.$BankConfigPayload<ExtArgs>
        fields: Prisma.BankConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BankConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BankConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankConfigPayload>
          }
          findFirst: {
            args: Prisma.BankConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BankConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankConfigPayload>
          }
          findMany: {
            args: Prisma.BankConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankConfigPayload>[]
          }
          create: {
            args: Prisma.BankConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankConfigPayload>
          }
          createMany: {
            args: Prisma.BankConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BankConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankConfigPayload>[]
          }
          delete: {
            args: Prisma.BankConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankConfigPayload>
          }
          update: {
            args: Prisma.BankConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankConfigPayload>
          }
          deleteMany: {
            args: Prisma.BankConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BankConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BankConfigUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankConfigPayload>[]
          }
          upsert: {
            args: Prisma.BankConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankConfigPayload>
          }
          aggregate: {
            args: Prisma.BankConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBankConfig>
          }
          groupBy: {
            args: Prisma.BankConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<BankConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.BankConfigCountArgs<ExtArgs>
            result: $Utils.Optional<BankConfigCountAggregateOutputType> | number
          }
        }
      }
      InterestRate: {
        payload: Prisma.$InterestRatePayload<ExtArgs>
        fields: Prisma.InterestRateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InterestRateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterestRatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InterestRateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterestRatePayload>
          }
          findFirst: {
            args: Prisma.InterestRateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterestRatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InterestRateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterestRatePayload>
          }
          findMany: {
            args: Prisma.InterestRateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterestRatePayload>[]
          }
          create: {
            args: Prisma.InterestRateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterestRatePayload>
          }
          createMany: {
            args: Prisma.InterestRateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InterestRateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterestRatePayload>[]
          }
          delete: {
            args: Prisma.InterestRateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterestRatePayload>
          }
          update: {
            args: Prisma.InterestRateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterestRatePayload>
          }
          deleteMany: {
            args: Prisma.InterestRateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InterestRateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.InterestRateUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterestRatePayload>[]
          }
          upsert: {
            args: Prisma.InterestRateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterestRatePayload>
          }
          aggregate: {
            args: Prisma.InterestRateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInterestRate>
          }
          groupBy: {
            args: Prisma.InterestRateGroupByArgs<ExtArgs>
            result: $Utils.Optional<InterestRateGroupByOutputType>[]
          }
          count: {
            args: Prisma.InterestRateCountArgs<ExtArgs>
            result: $Utils.Optional<InterestRateCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    branch?: BranchOmit
    region?: RegionOmit
    division?: DivisionOmit
    designation?: DesignationOmit
    campaign?: CampaignOmit
    document?: DocumentOmit
    branchSurvey?: BranchSurveyOmit
    bankConfig?: BankConfigOmit
    interestRate?: InterestRateOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    roll_number: string | null
    password_hash: string | null
    role: string | null
    office_level: string | null
    full_name: string | null
    full_name_hindi: string | null
    mobile: string | null
    designation: string | null
    designation_hindi: string | null
    photo_url: string | null
    is_head: boolean | null
    is_deleted: boolean | null
    must_change_password: boolean | null
    linked_branch_code: string | null
    linked_region_code: string | null
    departments: string | null
    history: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    roll_number: string | null
    password_hash: string | null
    role: string | null
    office_level: string | null
    full_name: string | null
    full_name_hindi: string | null
    mobile: string | null
    designation: string | null
    designation_hindi: string | null
    photo_url: string | null
    is_head: boolean | null
    is_deleted: boolean | null
    must_change_password: boolean | null
    linked_branch_code: string | null
    linked_region_code: string | null
    departments: string | null
    history: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    roll_number: number
    password_hash: number
    role: number
    office_level: number
    full_name: number
    full_name_hindi: number
    mobile: number
    designation: number
    designation_hindi: number
    photo_url: number
    is_head: number
    is_deleted: number
    must_change_password: number
    linked_branch_code: number
    linked_region_code: number
    departments: number
    history: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    roll_number?: true
    password_hash?: true
    role?: true
    office_level?: true
    full_name?: true
    full_name_hindi?: true
    mobile?: true
    designation?: true
    designation_hindi?: true
    photo_url?: true
    is_head?: true
    is_deleted?: true
    must_change_password?: true
    linked_branch_code?: true
    linked_region_code?: true
    departments?: true
    history?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    roll_number?: true
    password_hash?: true
    role?: true
    office_level?: true
    full_name?: true
    full_name_hindi?: true
    mobile?: true
    designation?: true
    designation_hindi?: true
    photo_url?: true
    is_head?: true
    is_deleted?: true
    must_change_password?: true
    linked_branch_code?: true
    linked_region_code?: true
    departments?: true
    history?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    roll_number?: true
    password_hash?: true
    role?: true
    office_level?: true
    full_name?: true
    full_name_hindi?: true
    mobile?: true
    designation?: true
    designation_hindi?: true
    photo_url?: true
    is_head?: true
    is_deleted?: true
    must_change_password?: true
    linked_branch_code?: true
    linked_region_code?: true
    departments?: true
    history?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    roll_number: string
    password_hash: string
    role: string
    office_level: string
    full_name: string
    full_name_hindi: string | null
    mobile: string | null
    designation: string | null
    designation_hindi: string | null
    photo_url: string | null
    is_head: boolean
    is_deleted: boolean
    must_change_password: boolean
    linked_branch_code: string | null
    linked_region_code: string | null
    departments: string | null
    history: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roll_number?: boolean
    password_hash?: boolean
    role?: boolean
    office_level?: boolean
    full_name?: boolean
    full_name_hindi?: boolean
    mobile?: boolean
    designation?: boolean
    designation_hindi?: boolean
    photo_url?: boolean
    is_head?: boolean
    is_deleted?: boolean
    must_change_password?: boolean
    linked_branch_code?: boolean
    linked_region_code?: boolean
    departments?: boolean
    history?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roll_number?: boolean
    password_hash?: boolean
    role?: boolean
    office_level?: boolean
    full_name?: boolean
    full_name_hindi?: boolean
    mobile?: boolean
    designation?: boolean
    designation_hindi?: boolean
    photo_url?: boolean
    is_head?: boolean
    is_deleted?: boolean
    must_change_password?: boolean
    linked_branch_code?: boolean
    linked_region_code?: boolean
    departments?: boolean
    history?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roll_number?: boolean
    password_hash?: boolean
    role?: boolean
    office_level?: boolean
    full_name?: boolean
    full_name_hindi?: boolean
    mobile?: boolean
    designation?: boolean
    designation_hindi?: boolean
    photo_url?: boolean
    is_head?: boolean
    is_deleted?: boolean
    must_change_password?: boolean
    linked_branch_code?: boolean
    linked_region_code?: boolean
    departments?: boolean
    history?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    roll_number?: boolean
    password_hash?: boolean
    role?: boolean
    office_level?: boolean
    full_name?: boolean
    full_name_hindi?: boolean
    mobile?: boolean
    designation?: boolean
    designation_hindi?: boolean
    photo_url?: boolean
    is_head?: boolean
    is_deleted?: boolean
    must_change_password?: boolean
    linked_branch_code?: boolean
    linked_region_code?: boolean
    departments?: boolean
    history?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "roll_number" | "password_hash" | "role" | "office_level" | "full_name" | "full_name_hindi" | "mobile" | "designation" | "designation_hindi" | "photo_url" | "is_head" | "is_deleted" | "must_change_password" | "linked_branch_code" | "linked_region_code" | "departments" | "history" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      roll_number: string
      password_hash: string
      role: string
      office_level: string
      full_name: string
      full_name_hindi: string | null
      mobile: string | null
      designation: string | null
      designation_hindi: string | null
      photo_url: string | null
      is_head: boolean
      is_deleted: boolean
      must_change_password: boolean
      linked_branch_code: string | null
      linked_region_code: string | null
      departments: string | null
      history: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly roll_number: FieldRef<"User", 'String'>
    readonly password_hash: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly office_level: FieldRef<"User", 'String'>
    readonly full_name: FieldRef<"User", 'String'>
    readonly full_name_hindi: FieldRef<"User", 'String'>
    readonly mobile: FieldRef<"User", 'String'>
    readonly designation: FieldRef<"User", 'String'>
    readonly designation_hindi: FieldRef<"User", 'String'>
    readonly photo_url: FieldRef<"User", 'String'>
    readonly is_head: FieldRef<"User", 'Boolean'>
    readonly is_deleted: FieldRef<"User", 'Boolean'>
    readonly must_change_password: FieldRef<"User", 'Boolean'>
    readonly linked_branch_code: FieldRef<"User", 'String'>
    readonly linked_region_code: FieldRef<"User", 'String'>
    readonly departments: FieldRef<"User", 'String'>
    readonly history: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
  }


  /**
   * Model Branch
   */

  export type AggregateBranch = {
    _count: BranchCountAggregateOutputType | null
    _avg: BranchAvgAggregateOutputType | null
    _sum: BranchSumAggregateOutputType | null
    _min: BranchMinAggregateOutputType | null
    _max: BranchMaxAggregateOutputType | null
  }

  export type BranchAvgAggregateOutputType = {
    id: number | null
  }

  export type BranchSumAggregateOutputType = {
    id: number | null
  }

  export type BranchMinAggregateOutputType = {
    id: number | null
    branch_code: string | null
    branch_name: string | null
    branch_type: string | null
    category: string | null
    region_code: string | null
    state: string | null
    district: string | null
    taluk: string | null
    revenue_centre: string | null
    locality: string | null
    latitude: string | null
    longitude: string | null
    pincode: string | null
    is_deleted: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BranchMaxAggregateOutputType = {
    id: number | null
    branch_code: string | null
    branch_name: string | null
    branch_type: string | null
    category: string | null
    region_code: string | null
    state: string | null
    district: string | null
    taluk: string | null
    revenue_centre: string | null
    locality: string | null
    latitude: string | null
    longitude: string | null
    pincode: string | null
    is_deleted: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BranchCountAggregateOutputType = {
    id: number
    branch_code: number
    branch_name: number
    branch_type: number
    category: number
    region_code: number
    state: number
    district: number
    taluk: number
    revenue_centre: number
    locality: number
    latitude: number
    longitude: number
    pincode: number
    is_deleted: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BranchAvgAggregateInputType = {
    id?: true
  }

  export type BranchSumAggregateInputType = {
    id?: true
  }

  export type BranchMinAggregateInputType = {
    id?: true
    branch_code?: true
    branch_name?: true
    branch_type?: true
    category?: true
    region_code?: true
    state?: true
    district?: true
    taluk?: true
    revenue_centre?: true
    locality?: true
    latitude?: true
    longitude?: true
    pincode?: true
    is_deleted?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BranchMaxAggregateInputType = {
    id?: true
    branch_code?: true
    branch_name?: true
    branch_type?: true
    category?: true
    region_code?: true
    state?: true
    district?: true
    taluk?: true
    revenue_centre?: true
    locality?: true
    latitude?: true
    longitude?: true
    pincode?: true
    is_deleted?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BranchCountAggregateInputType = {
    id?: true
    branch_code?: true
    branch_name?: true
    branch_type?: true
    category?: true
    region_code?: true
    state?: true
    district?: true
    taluk?: true
    revenue_centre?: true
    locality?: true
    latitude?: true
    longitude?: true
    pincode?: true
    is_deleted?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BranchAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Branch to aggregate.
     */
    where?: BranchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Branches to fetch.
     */
    orderBy?: BranchOrderByWithRelationInput | BranchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BranchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Branches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Branches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Branches
    **/
    _count?: true | BranchCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BranchAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BranchSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BranchMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BranchMaxAggregateInputType
  }

  export type GetBranchAggregateType<T extends BranchAggregateArgs> = {
        [P in keyof T & keyof AggregateBranch]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBranch[P]>
      : GetScalarType<T[P], AggregateBranch[P]>
  }




  export type BranchGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BranchWhereInput
    orderBy?: BranchOrderByWithAggregationInput | BranchOrderByWithAggregationInput[]
    by: BranchScalarFieldEnum[] | BranchScalarFieldEnum
    having?: BranchScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BranchCountAggregateInputType | true
    _avg?: BranchAvgAggregateInputType
    _sum?: BranchSumAggregateInputType
    _min?: BranchMinAggregateInputType
    _max?: BranchMaxAggregateInputType
  }

  export type BranchGroupByOutputType = {
    id: number
    branch_code: string
    branch_name: string
    branch_type: string | null
    category: string | null
    region_code: string | null
    state: string | null
    district: string | null
    taluk: string | null
    revenue_centre: string | null
    locality: string | null
    latitude: string | null
    longitude: string | null
    pincode: string | null
    is_deleted: boolean
    createdAt: Date
    updatedAt: Date
    _count: BranchCountAggregateOutputType | null
    _avg: BranchAvgAggregateOutputType | null
    _sum: BranchSumAggregateOutputType | null
    _min: BranchMinAggregateOutputType | null
    _max: BranchMaxAggregateOutputType | null
  }

  type GetBranchGroupByPayload<T extends BranchGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BranchGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BranchGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BranchGroupByOutputType[P]>
            : GetScalarType<T[P], BranchGroupByOutputType[P]>
        }
      >
    >


  export type BranchSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    branch_code?: boolean
    branch_name?: boolean
    branch_type?: boolean
    category?: boolean
    region_code?: boolean
    state?: boolean
    district?: boolean
    taluk?: boolean
    revenue_centre?: boolean
    locality?: boolean
    latitude?: boolean
    longitude?: boolean
    pincode?: boolean
    is_deleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["branch"]>

  export type BranchSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    branch_code?: boolean
    branch_name?: boolean
    branch_type?: boolean
    category?: boolean
    region_code?: boolean
    state?: boolean
    district?: boolean
    taluk?: boolean
    revenue_centre?: boolean
    locality?: boolean
    latitude?: boolean
    longitude?: boolean
    pincode?: boolean
    is_deleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["branch"]>

  export type BranchSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    branch_code?: boolean
    branch_name?: boolean
    branch_type?: boolean
    category?: boolean
    region_code?: boolean
    state?: boolean
    district?: boolean
    taluk?: boolean
    revenue_centre?: boolean
    locality?: boolean
    latitude?: boolean
    longitude?: boolean
    pincode?: boolean
    is_deleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["branch"]>

  export type BranchSelectScalar = {
    id?: boolean
    branch_code?: boolean
    branch_name?: boolean
    branch_type?: boolean
    category?: boolean
    region_code?: boolean
    state?: boolean
    district?: boolean
    taluk?: boolean
    revenue_centre?: boolean
    locality?: boolean
    latitude?: boolean
    longitude?: boolean
    pincode?: boolean
    is_deleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BranchOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "branch_code" | "branch_name" | "branch_type" | "category" | "region_code" | "state" | "district" | "taluk" | "revenue_centre" | "locality" | "latitude" | "longitude" | "pincode" | "is_deleted" | "createdAt" | "updatedAt", ExtArgs["result"]["branch"]>

  export type $BranchPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Branch"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      branch_code: string
      branch_name: string
      branch_type: string | null
      category: string | null
      region_code: string | null
      state: string | null
      district: string | null
      taluk: string | null
      revenue_centre: string | null
      locality: string | null
      latitude: string | null
      longitude: string | null
      pincode: string | null
      is_deleted: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["branch"]>
    composites: {}
  }

  type BranchGetPayload<S extends boolean | null | undefined | BranchDefaultArgs> = $Result.GetResult<Prisma.$BranchPayload, S>

  type BranchCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BranchFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BranchCountAggregateInputType | true
    }

  export interface BranchDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Branch'], meta: { name: 'Branch' } }
    /**
     * Find zero or one Branch that matches the filter.
     * @param {BranchFindUniqueArgs} args - Arguments to find a Branch
     * @example
     * // Get one Branch
     * const branch = await prisma.branch.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BranchFindUniqueArgs>(args: SelectSubset<T, BranchFindUniqueArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Branch that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BranchFindUniqueOrThrowArgs} args - Arguments to find a Branch
     * @example
     * // Get one Branch
     * const branch = await prisma.branch.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BranchFindUniqueOrThrowArgs>(args: SelectSubset<T, BranchFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Branch that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchFindFirstArgs} args - Arguments to find a Branch
     * @example
     * // Get one Branch
     * const branch = await prisma.branch.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BranchFindFirstArgs>(args?: SelectSubset<T, BranchFindFirstArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Branch that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchFindFirstOrThrowArgs} args - Arguments to find a Branch
     * @example
     * // Get one Branch
     * const branch = await prisma.branch.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BranchFindFirstOrThrowArgs>(args?: SelectSubset<T, BranchFindFirstOrThrowArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Branches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Branches
     * const branches = await prisma.branch.findMany()
     * 
     * // Get first 10 Branches
     * const branches = await prisma.branch.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const branchWithIdOnly = await prisma.branch.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BranchFindManyArgs>(args?: SelectSubset<T, BranchFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Branch.
     * @param {BranchCreateArgs} args - Arguments to create a Branch.
     * @example
     * // Create one Branch
     * const Branch = await prisma.branch.create({
     *   data: {
     *     // ... data to create a Branch
     *   }
     * })
     * 
     */
    create<T extends BranchCreateArgs>(args: SelectSubset<T, BranchCreateArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Branches.
     * @param {BranchCreateManyArgs} args - Arguments to create many Branches.
     * @example
     * // Create many Branches
     * const branch = await prisma.branch.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BranchCreateManyArgs>(args?: SelectSubset<T, BranchCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Branches and returns the data saved in the database.
     * @param {BranchCreateManyAndReturnArgs} args - Arguments to create many Branches.
     * @example
     * // Create many Branches
     * const branch = await prisma.branch.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Branches and only return the `id`
     * const branchWithIdOnly = await prisma.branch.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BranchCreateManyAndReturnArgs>(args?: SelectSubset<T, BranchCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Branch.
     * @param {BranchDeleteArgs} args - Arguments to delete one Branch.
     * @example
     * // Delete one Branch
     * const Branch = await prisma.branch.delete({
     *   where: {
     *     // ... filter to delete one Branch
     *   }
     * })
     * 
     */
    delete<T extends BranchDeleteArgs>(args: SelectSubset<T, BranchDeleteArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Branch.
     * @param {BranchUpdateArgs} args - Arguments to update one Branch.
     * @example
     * // Update one Branch
     * const branch = await prisma.branch.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BranchUpdateArgs>(args: SelectSubset<T, BranchUpdateArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Branches.
     * @param {BranchDeleteManyArgs} args - Arguments to filter Branches to delete.
     * @example
     * // Delete a few Branches
     * const { count } = await prisma.branch.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BranchDeleteManyArgs>(args?: SelectSubset<T, BranchDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Branches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Branches
     * const branch = await prisma.branch.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BranchUpdateManyArgs>(args: SelectSubset<T, BranchUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Branches and returns the data updated in the database.
     * @param {BranchUpdateManyAndReturnArgs} args - Arguments to update many Branches.
     * @example
     * // Update many Branches
     * const branch = await prisma.branch.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Branches and only return the `id`
     * const branchWithIdOnly = await prisma.branch.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BranchUpdateManyAndReturnArgs>(args: SelectSubset<T, BranchUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Branch.
     * @param {BranchUpsertArgs} args - Arguments to update or create a Branch.
     * @example
     * // Update or create a Branch
     * const branch = await prisma.branch.upsert({
     *   create: {
     *     // ... data to create a Branch
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Branch we want to update
     *   }
     * })
     */
    upsert<T extends BranchUpsertArgs>(args: SelectSubset<T, BranchUpsertArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Branches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchCountArgs} args - Arguments to filter Branches to count.
     * @example
     * // Count the number of Branches
     * const count = await prisma.branch.count({
     *   where: {
     *     // ... the filter for the Branches we want to count
     *   }
     * })
    **/
    count<T extends BranchCountArgs>(
      args?: Subset<T, BranchCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BranchCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Branch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BranchAggregateArgs>(args: Subset<T, BranchAggregateArgs>): Prisma.PrismaPromise<GetBranchAggregateType<T>>

    /**
     * Group by Branch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BranchGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BranchGroupByArgs['orderBy'] }
        : { orderBy?: BranchGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BranchGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBranchGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Branch model
   */
  readonly fields: BranchFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Branch.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BranchClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Branch model
   */
  interface BranchFieldRefs {
    readonly id: FieldRef<"Branch", 'Int'>
    readonly branch_code: FieldRef<"Branch", 'String'>
    readonly branch_name: FieldRef<"Branch", 'String'>
    readonly branch_type: FieldRef<"Branch", 'String'>
    readonly category: FieldRef<"Branch", 'String'>
    readonly region_code: FieldRef<"Branch", 'String'>
    readonly state: FieldRef<"Branch", 'String'>
    readonly district: FieldRef<"Branch", 'String'>
    readonly taluk: FieldRef<"Branch", 'String'>
    readonly revenue_centre: FieldRef<"Branch", 'String'>
    readonly locality: FieldRef<"Branch", 'String'>
    readonly latitude: FieldRef<"Branch", 'String'>
    readonly longitude: FieldRef<"Branch", 'String'>
    readonly pincode: FieldRef<"Branch", 'String'>
    readonly is_deleted: FieldRef<"Branch", 'Boolean'>
    readonly createdAt: FieldRef<"Branch", 'DateTime'>
    readonly updatedAt: FieldRef<"Branch", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Branch findUnique
   */
  export type BranchFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Filter, which Branch to fetch.
     */
    where: BranchWhereUniqueInput
  }

  /**
   * Branch findUniqueOrThrow
   */
  export type BranchFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Filter, which Branch to fetch.
     */
    where: BranchWhereUniqueInput
  }

  /**
   * Branch findFirst
   */
  export type BranchFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Filter, which Branch to fetch.
     */
    where?: BranchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Branches to fetch.
     */
    orderBy?: BranchOrderByWithRelationInput | BranchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Branches.
     */
    cursor?: BranchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Branches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Branches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Branches.
     */
    distinct?: BranchScalarFieldEnum | BranchScalarFieldEnum[]
  }

  /**
   * Branch findFirstOrThrow
   */
  export type BranchFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Filter, which Branch to fetch.
     */
    where?: BranchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Branches to fetch.
     */
    orderBy?: BranchOrderByWithRelationInput | BranchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Branches.
     */
    cursor?: BranchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Branches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Branches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Branches.
     */
    distinct?: BranchScalarFieldEnum | BranchScalarFieldEnum[]
  }

  /**
   * Branch findMany
   */
  export type BranchFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Filter, which Branches to fetch.
     */
    where?: BranchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Branches to fetch.
     */
    orderBy?: BranchOrderByWithRelationInput | BranchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Branches.
     */
    cursor?: BranchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Branches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Branches.
     */
    skip?: number
    distinct?: BranchScalarFieldEnum | BranchScalarFieldEnum[]
  }

  /**
   * Branch create
   */
  export type BranchCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * The data needed to create a Branch.
     */
    data: XOR<BranchCreateInput, BranchUncheckedCreateInput>
  }

  /**
   * Branch createMany
   */
  export type BranchCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Branches.
     */
    data: BranchCreateManyInput | BranchCreateManyInput[]
  }

  /**
   * Branch createManyAndReturn
   */
  export type BranchCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * The data used to create many Branches.
     */
    data: BranchCreateManyInput | BranchCreateManyInput[]
  }

  /**
   * Branch update
   */
  export type BranchUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * The data needed to update a Branch.
     */
    data: XOR<BranchUpdateInput, BranchUncheckedUpdateInput>
    /**
     * Choose, which Branch to update.
     */
    where: BranchWhereUniqueInput
  }

  /**
   * Branch updateMany
   */
  export type BranchUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Branches.
     */
    data: XOR<BranchUpdateManyMutationInput, BranchUncheckedUpdateManyInput>
    /**
     * Filter which Branches to update
     */
    where?: BranchWhereInput
    /**
     * Limit how many Branches to update.
     */
    limit?: number
  }

  /**
   * Branch updateManyAndReturn
   */
  export type BranchUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * The data used to update Branches.
     */
    data: XOR<BranchUpdateManyMutationInput, BranchUncheckedUpdateManyInput>
    /**
     * Filter which Branches to update
     */
    where?: BranchWhereInput
    /**
     * Limit how many Branches to update.
     */
    limit?: number
  }

  /**
   * Branch upsert
   */
  export type BranchUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * The filter to search for the Branch to update in case it exists.
     */
    where: BranchWhereUniqueInput
    /**
     * In case the Branch found by the `where` argument doesn't exist, create a new Branch with this data.
     */
    create: XOR<BranchCreateInput, BranchUncheckedCreateInput>
    /**
     * In case the Branch was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BranchUpdateInput, BranchUncheckedUpdateInput>
  }

  /**
   * Branch delete
   */
  export type BranchDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Filter which Branch to delete.
     */
    where: BranchWhereUniqueInput
  }

  /**
   * Branch deleteMany
   */
  export type BranchDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Branches to delete
     */
    where?: BranchWhereInput
    /**
     * Limit how many Branches to delete.
     */
    limit?: number
  }

  /**
   * Branch without action
   */
  export type BranchDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
  }


  /**
   * Model Region
   */

  export type AggregateRegion = {
    _count: RegionCountAggregateOutputType | null
    _avg: RegionAvgAggregateOutputType | null
    _sum: RegionSumAggregateOutputType | null
    _min: RegionMinAggregateOutputType | null
    _max: RegionMaxAggregateOutputType | null
  }

  export type RegionAvgAggregateOutputType = {
    id: number | null
  }

  export type RegionSumAggregateOutputType = {
    id: number | null
  }

  export type RegionMinAggregateOutputType = {
    id: number | null
    region_code: string | null
    region_name: string | null
    region_name_hindi: string | null
    region_name_local: string | null
    region_address: string | null
    region_address_hindi: string | null
    region_address_local: string | null
    head_office_code: string | null
    is_deleted: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RegionMaxAggregateOutputType = {
    id: number | null
    region_code: string | null
    region_name: string | null
    region_name_hindi: string | null
    region_name_local: string | null
    region_address: string | null
    region_address_hindi: string | null
    region_address_local: string | null
    head_office_code: string | null
    is_deleted: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RegionCountAggregateOutputType = {
    id: number
    region_code: number
    region_name: number
    region_name_hindi: number
    region_name_local: number
    region_address: number
    region_address_hindi: number
    region_address_local: number
    head_office_code: number
    is_deleted: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RegionAvgAggregateInputType = {
    id?: true
  }

  export type RegionSumAggregateInputType = {
    id?: true
  }

  export type RegionMinAggregateInputType = {
    id?: true
    region_code?: true
    region_name?: true
    region_name_hindi?: true
    region_name_local?: true
    region_address?: true
    region_address_hindi?: true
    region_address_local?: true
    head_office_code?: true
    is_deleted?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RegionMaxAggregateInputType = {
    id?: true
    region_code?: true
    region_name?: true
    region_name_hindi?: true
    region_name_local?: true
    region_address?: true
    region_address_hindi?: true
    region_address_local?: true
    head_office_code?: true
    is_deleted?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RegionCountAggregateInputType = {
    id?: true
    region_code?: true
    region_name?: true
    region_name_hindi?: true
    region_name_local?: true
    region_address?: true
    region_address_hindi?: true
    region_address_local?: true
    head_office_code?: true
    is_deleted?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RegionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Region to aggregate.
     */
    where?: RegionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Regions to fetch.
     */
    orderBy?: RegionOrderByWithRelationInput | RegionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RegionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Regions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Regions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Regions
    **/
    _count?: true | RegionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RegionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RegionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RegionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RegionMaxAggregateInputType
  }

  export type GetRegionAggregateType<T extends RegionAggregateArgs> = {
        [P in keyof T & keyof AggregateRegion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRegion[P]>
      : GetScalarType<T[P], AggregateRegion[P]>
  }




  export type RegionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RegionWhereInput
    orderBy?: RegionOrderByWithAggregationInput | RegionOrderByWithAggregationInput[]
    by: RegionScalarFieldEnum[] | RegionScalarFieldEnum
    having?: RegionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RegionCountAggregateInputType | true
    _avg?: RegionAvgAggregateInputType
    _sum?: RegionSumAggregateInputType
    _min?: RegionMinAggregateInputType
    _max?: RegionMaxAggregateInputType
  }

  export type RegionGroupByOutputType = {
    id: number
    region_code: string
    region_name: string
    region_name_hindi: string | null
    region_name_local: string | null
    region_address: string | null
    region_address_hindi: string | null
    region_address_local: string | null
    head_office_code: string | null
    is_deleted: boolean
    createdAt: Date
    updatedAt: Date
    _count: RegionCountAggregateOutputType | null
    _avg: RegionAvgAggregateOutputType | null
    _sum: RegionSumAggregateOutputType | null
    _min: RegionMinAggregateOutputType | null
    _max: RegionMaxAggregateOutputType | null
  }

  type GetRegionGroupByPayload<T extends RegionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RegionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RegionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RegionGroupByOutputType[P]>
            : GetScalarType<T[P], RegionGroupByOutputType[P]>
        }
      >
    >


  export type RegionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    region_code?: boolean
    region_name?: boolean
    region_name_hindi?: boolean
    region_name_local?: boolean
    region_address?: boolean
    region_address_hindi?: boolean
    region_address_local?: boolean
    head_office_code?: boolean
    is_deleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["region"]>

  export type RegionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    region_code?: boolean
    region_name?: boolean
    region_name_hindi?: boolean
    region_name_local?: boolean
    region_address?: boolean
    region_address_hindi?: boolean
    region_address_local?: boolean
    head_office_code?: boolean
    is_deleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["region"]>

  export type RegionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    region_code?: boolean
    region_name?: boolean
    region_name_hindi?: boolean
    region_name_local?: boolean
    region_address?: boolean
    region_address_hindi?: boolean
    region_address_local?: boolean
    head_office_code?: boolean
    is_deleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["region"]>

  export type RegionSelectScalar = {
    id?: boolean
    region_code?: boolean
    region_name?: boolean
    region_name_hindi?: boolean
    region_name_local?: boolean
    region_address?: boolean
    region_address_hindi?: boolean
    region_address_local?: boolean
    head_office_code?: boolean
    is_deleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RegionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "region_code" | "region_name" | "region_name_hindi" | "region_name_local" | "region_address" | "region_address_hindi" | "region_address_local" | "head_office_code" | "is_deleted" | "createdAt" | "updatedAt", ExtArgs["result"]["region"]>

  export type $RegionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Region"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      region_code: string
      region_name: string
      region_name_hindi: string | null
      region_name_local: string | null
      region_address: string | null
      region_address_hindi: string | null
      region_address_local: string | null
      head_office_code: string | null
      is_deleted: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["region"]>
    composites: {}
  }

  type RegionGetPayload<S extends boolean | null | undefined | RegionDefaultArgs> = $Result.GetResult<Prisma.$RegionPayload, S>

  type RegionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RegionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RegionCountAggregateInputType | true
    }

  export interface RegionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Region'], meta: { name: 'Region' } }
    /**
     * Find zero or one Region that matches the filter.
     * @param {RegionFindUniqueArgs} args - Arguments to find a Region
     * @example
     * // Get one Region
     * const region = await prisma.region.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RegionFindUniqueArgs>(args: SelectSubset<T, RegionFindUniqueArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Region that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RegionFindUniqueOrThrowArgs} args - Arguments to find a Region
     * @example
     * // Get one Region
     * const region = await prisma.region.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RegionFindUniqueOrThrowArgs>(args: SelectSubset<T, RegionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Region that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionFindFirstArgs} args - Arguments to find a Region
     * @example
     * // Get one Region
     * const region = await prisma.region.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RegionFindFirstArgs>(args?: SelectSubset<T, RegionFindFirstArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Region that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionFindFirstOrThrowArgs} args - Arguments to find a Region
     * @example
     * // Get one Region
     * const region = await prisma.region.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RegionFindFirstOrThrowArgs>(args?: SelectSubset<T, RegionFindFirstOrThrowArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Regions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Regions
     * const regions = await prisma.region.findMany()
     * 
     * // Get first 10 Regions
     * const regions = await prisma.region.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const regionWithIdOnly = await prisma.region.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RegionFindManyArgs>(args?: SelectSubset<T, RegionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Region.
     * @param {RegionCreateArgs} args - Arguments to create a Region.
     * @example
     * // Create one Region
     * const Region = await prisma.region.create({
     *   data: {
     *     // ... data to create a Region
     *   }
     * })
     * 
     */
    create<T extends RegionCreateArgs>(args: SelectSubset<T, RegionCreateArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Regions.
     * @param {RegionCreateManyArgs} args - Arguments to create many Regions.
     * @example
     * // Create many Regions
     * const region = await prisma.region.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RegionCreateManyArgs>(args?: SelectSubset<T, RegionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Regions and returns the data saved in the database.
     * @param {RegionCreateManyAndReturnArgs} args - Arguments to create many Regions.
     * @example
     * // Create many Regions
     * const region = await prisma.region.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Regions and only return the `id`
     * const regionWithIdOnly = await prisma.region.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RegionCreateManyAndReturnArgs>(args?: SelectSubset<T, RegionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Region.
     * @param {RegionDeleteArgs} args - Arguments to delete one Region.
     * @example
     * // Delete one Region
     * const Region = await prisma.region.delete({
     *   where: {
     *     // ... filter to delete one Region
     *   }
     * })
     * 
     */
    delete<T extends RegionDeleteArgs>(args: SelectSubset<T, RegionDeleteArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Region.
     * @param {RegionUpdateArgs} args - Arguments to update one Region.
     * @example
     * // Update one Region
     * const region = await prisma.region.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RegionUpdateArgs>(args: SelectSubset<T, RegionUpdateArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Regions.
     * @param {RegionDeleteManyArgs} args - Arguments to filter Regions to delete.
     * @example
     * // Delete a few Regions
     * const { count } = await prisma.region.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RegionDeleteManyArgs>(args?: SelectSubset<T, RegionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Regions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Regions
     * const region = await prisma.region.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RegionUpdateManyArgs>(args: SelectSubset<T, RegionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Regions and returns the data updated in the database.
     * @param {RegionUpdateManyAndReturnArgs} args - Arguments to update many Regions.
     * @example
     * // Update many Regions
     * const region = await prisma.region.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Regions and only return the `id`
     * const regionWithIdOnly = await prisma.region.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RegionUpdateManyAndReturnArgs>(args: SelectSubset<T, RegionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Region.
     * @param {RegionUpsertArgs} args - Arguments to update or create a Region.
     * @example
     * // Update or create a Region
     * const region = await prisma.region.upsert({
     *   create: {
     *     // ... data to create a Region
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Region we want to update
     *   }
     * })
     */
    upsert<T extends RegionUpsertArgs>(args: SelectSubset<T, RegionUpsertArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Regions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionCountArgs} args - Arguments to filter Regions to count.
     * @example
     * // Count the number of Regions
     * const count = await prisma.region.count({
     *   where: {
     *     // ... the filter for the Regions we want to count
     *   }
     * })
    **/
    count<T extends RegionCountArgs>(
      args?: Subset<T, RegionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RegionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Region.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RegionAggregateArgs>(args: Subset<T, RegionAggregateArgs>): Prisma.PrismaPromise<GetRegionAggregateType<T>>

    /**
     * Group by Region.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RegionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RegionGroupByArgs['orderBy'] }
        : { orderBy?: RegionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RegionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRegionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Region model
   */
  readonly fields: RegionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Region.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RegionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Region model
   */
  interface RegionFieldRefs {
    readonly id: FieldRef<"Region", 'Int'>
    readonly region_code: FieldRef<"Region", 'String'>
    readonly region_name: FieldRef<"Region", 'String'>
    readonly region_name_hindi: FieldRef<"Region", 'String'>
    readonly region_name_local: FieldRef<"Region", 'String'>
    readonly region_address: FieldRef<"Region", 'String'>
    readonly region_address_hindi: FieldRef<"Region", 'String'>
    readonly region_address_local: FieldRef<"Region", 'String'>
    readonly head_office_code: FieldRef<"Region", 'String'>
    readonly is_deleted: FieldRef<"Region", 'Boolean'>
    readonly createdAt: FieldRef<"Region", 'DateTime'>
    readonly updatedAt: FieldRef<"Region", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Region findUnique
   */
  export type RegionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Filter, which Region to fetch.
     */
    where: RegionWhereUniqueInput
  }

  /**
   * Region findUniqueOrThrow
   */
  export type RegionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Filter, which Region to fetch.
     */
    where: RegionWhereUniqueInput
  }

  /**
   * Region findFirst
   */
  export type RegionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Filter, which Region to fetch.
     */
    where?: RegionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Regions to fetch.
     */
    orderBy?: RegionOrderByWithRelationInput | RegionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Regions.
     */
    cursor?: RegionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Regions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Regions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Regions.
     */
    distinct?: RegionScalarFieldEnum | RegionScalarFieldEnum[]
  }

  /**
   * Region findFirstOrThrow
   */
  export type RegionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Filter, which Region to fetch.
     */
    where?: RegionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Regions to fetch.
     */
    orderBy?: RegionOrderByWithRelationInput | RegionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Regions.
     */
    cursor?: RegionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Regions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Regions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Regions.
     */
    distinct?: RegionScalarFieldEnum | RegionScalarFieldEnum[]
  }

  /**
   * Region findMany
   */
  export type RegionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Filter, which Regions to fetch.
     */
    where?: RegionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Regions to fetch.
     */
    orderBy?: RegionOrderByWithRelationInput | RegionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Regions.
     */
    cursor?: RegionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Regions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Regions.
     */
    skip?: number
    distinct?: RegionScalarFieldEnum | RegionScalarFieldEnum[]
  }

  /**
   * Region create
   */
  export type RegionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * The data needed to create a Region.
     */
    data: XOR<RegionCreateInput, RegionUncheckedCreateInput>
  }

  /**
   * Region createMany
   */
  export type RegionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Regions.
     */
    data: RegionCreateManyInput | RegionCreateManyInput[]
  }

  /**
   * Region createManyAndReturn
   */
  export type RegionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * The data used to create many Regions.
     */
    data: RegionCreateManyInput | RegionCreateManyInput[]
  }

  /**
   * Region update
   */
  export type RegionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * The data needed to update a Region.
     */
    data: XOR<RegionUpdateInput, RegionUncheckedUpdateInput>
    /**
     * Choose, which Region to update.
     */
    where: RegionWhereUniqueInput
  }

  /**
   * Region updateMany
   */
  export type RegionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Regions.
     */
    data: XOR<RegionUpdateManyMutationInput, RegionUncheckedUpdateManyInput>
    /**
     * Filter which Regions to update
     */
    where?: RegionWhereInput
    /**
     * Limit how many Regions to update.
     */
    limit?: number
  }

  /**
   * Region updateManyAndReturn
   */
  export type RegionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * The data used to update Regions.
     */
    data: XOR<RegionUpdateManyMutationInput, RegionUncheckedUpdateManyInput>
    /**
     * Filter which Regions to update
     */
    where?: RegionWhereInput
    /**
     * Limit how many Regions to update.
     */
    limit?: number
  }

  /**
   * Region upsert
   */
  export type RegionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * The filter to search for the Region to update in case it exists.
     */
    where: RegionWhereUniqueInput
    /**
     * In case the Region found by the `where` argument doesn't exist, create a new Region with this data.
     */
    create: XOR<RegionCreateInput, RegionUncheckedCreateInput>
    /**
     * In case the Region was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RegionUpdateInput, RegionUncheckedUpdateInput>
  }

  /**
   * Region delete
   */
  export type RegionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Filter which Region to delete.
     */
    where: RegionWhereUniqueInput
  }

  /**
   * Region deleteMany
   */
  export type RegionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Regions to delete
     */
    where?: RegionWhereInput
    /**
     * Limit how many Regions to delete.
     */
    limit?: number
  }

  /**
   * Region without action
   */
  export type RegionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
  }


  /**
   * Model Division
   */

  export type AggregateDivision = {
    _count: DivisionCountAggregateOutputType | null
    _avg: DivisionAvgAggregateOutputType | null
    _sum: DivisionSumAggregateOutputType | null
    _min: DivisionMinAggregateOutputType | null
    _max: DivisionMaxAggregateOutputType | null
  }

  export type DivisionAvgAggregateOutputType = {
    id: number | null
  }

  export type DivisionSumAggregateOutputType = {
    id: number | null
  }

  export type DivisionMinAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type DivisionMaxAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type DivisionCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type DivisionAvgAggregateInputType = {
    id?: true
  }

  export type DivisionSumAggregateInputType = {
    id?: true
  }

  export type DivisionMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type DivisionMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type DivisionCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type DivisionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Division to aggregate.
     */
    where?: DivisionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Divisions to fetch.
     */
    orderBy?: DivisionOrderByWithRelationInput | DivisionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DivisionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Divisions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Divisions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Divisions
    **/
    _count?: true | DivisionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DivisionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DivisionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DivisionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DivisionMaxAggregateInputType
  }

  export type GetDivisionAggregateType<T extends DivisionAggregateArgs> = {
        [P in keyof T & keyof AggregateDivision]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDivision[P]>
      : GetScalarType<T[P], AggregateDivision[P]>
  }




  export type DivisionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DivisionWhereInput
    orderBy?: DivisionOrderByWithAggregationInput | DivisionOrderByWithAggregationInput[]
    by: DivisionScalarFieldEnum[] | DivisionScalarFieldEnum
    having?: DivisionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DivisionCountAggregateInputType | true
    _avg?: DivisionAvgAggregateInputType
    _sum?: DivisionSumAggregateInputType
    _min?: DivisionMinAggregateInputType
    _max?: DivisionMaxAggregateInputType
  }

  export type DivisionGroupByOutputType = {
    id: number
    name: string
    _count: DivisionCountAggregateOutputType | null
    _avg: DivisionAvgAggregateOutputType | null
    _sum: DivisionSumAggregateOutputType | null
    _min: DivisionMinAggregateOutputType | null
    _max: DivisionMaxAggregateOutputType | null
  }

  type GetDivisionGroupByPayload<T extends DivisionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DivisionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DivisionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DivisionGroupByOutputType[P]>
            : GetScalarType<T[P], DivisionGroupByOutputType[P]>
        }
      >
    >


  export type DivisionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["division"]>

  export type DivisionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["division"]>

  export type DivisionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["division"]>

  export type DivisionSelectScalar = {
    id?: boolean
    name?: boolean
  }

  export type DivisionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name", ExtArgs["result"]["division"]>

  export type $DivisionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Division"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
    }, ExtArgs["result"]["division"]>
    composites: {}
  }

  type DivisionGetPayload<S extends boolean | null | undefined | DivisionDefaultArgs> = $Result.GetResult<Prisma.$DivisionPayload, S>

  type DivisionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DivisionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DivisionCountAggregateInputType | true
    }

  export interface DivisionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Division'], meta: { name: 'Division' } }
    /**
     * Find zero or one Division that matches the filter.
     * @param {DivisionFindUniqueArgs} args - Arguments to find a Division
     * @example
     * // Get one Division
     * const division = await prisma.division.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DivisionFindUniqueArgs>(args: SelectSubset<T, DivisionFindUniqueArgs<ExtArgs>>): Prisma__DivisionClient<$Result.GetResult<Prisma.$DivisionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Division that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DivisionFindUniqueOrThrowArgs} args - Arguments to find a Division
     * @example
     * // Get one Division
     * const division = await prisma.division.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DivisionFindUniqueOrThrowArgs>(args: SelectSubset<T, DivisionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DivisionClient<$Result.GetResult<Prisma.$DivisionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Division that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DivisionFindFirstArgs} args - Arguments to find a Division
     * @example
     * // Get one Division
     * const division = await prisma.division.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DivisionFindFirstArgs>(args?: SelectSubset<T, DivisionFindFirstArgs<ExtArgs>>): Prisma__DivisionClient<$Result.GetResult<Prisma.$DivisionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Division that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DivisionFindFirstOrThrowArgs} args - Arguments to find a Division
     * @example
     * // Get one Division
     * const division = await prisma.division.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DivisionFindFirstOrThrowArgs>(args?: SelectSubset<T, DivisionFindFirstOrThrowArgs<ExtArgs>>): Prisma__DivisionClient<$Result.GetResult<Prisma.$DivisionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Divisions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DivisionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Divisions
     * const divisions = await prisma.division.findMany()
     * 
     * // Get first 10 Divisions
     * const divisions = await prisma.division.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const divisionWithIdOnly = await prisma.division.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DivisionFindManyArgs>(args?: SelectSubset<T, DivisionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DivisionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Division.
     * @param {DivisionCreateArgs} args - Arguments to create a Division.
     * @example
     * // Create one Division
     * const Division = await prisma.division.create({
     *   data: {
     *     // ... data to create a Division
     *   }
     * })
     * 
     */
    create<T extends DivisionCreateArgs>(args: SelectSubset<T, DivisionCreateArgs<ExtArgs>>): Prisma__DivisionClient<$Result.GetResult<Prisma.$DivisionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Divisions.
     * @param {DivisionCreateManyArgs} args - Arguments to create many Divisions.
     * @example
     * // Create many Divisions
     * const division = await prisma.division.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DivisionCreateManyArgs>(args?: SelectSubset<T, DivisionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Divisions and returns the data saved in the database.
     * @param {DivisionCreateManyAndReturnArgs} args - Arguments to create many Divisions.
     * @example
     * // Create many Divisions
     * const division = await prisma.division.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Divisions and only return the `id`
     * const divisionWithIdOnly = await prisma.division.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DivisionCreateManyAndReturnArgs>(args?: SelectSubset<T, DivisionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DivisionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Division.
     * @param {DivisionDeleteArgs} args - Arguments to delete one Division.
     * @example
     * // Delete one Division
     * const Division = await prisma.division.delete({
     *   where: {
     *     // ... filter to delete one Division
     *   }
     * })
     * 
     */
    delete<T extends DivisionDeleteArgs>(args: SelectSubset<T, DivisionDeleteArgs<ExtArgs>>): Prisma__DivisionClient<$Result.GetResult<Prisma.$DivisionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Division.
     * @param {DivisionUpdateArgs} args - Arguments to update one Division.
     * @example
     * // Update one Division
     * const division = await prisma.division.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DivisionUpdateArgs>(args: SelectSubset<T, DivisionUpdateArgs<ExtArgs>>): Prisma__DivisionClient<$Result.GetResult<Prisma.$DivisionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Divisions.
     * @param {DivisionDeleteManyArgs} args - Arguments to filter Divisions to delete.
     * @example
     * // Delete a few Divisions
     * const { count } = await prisma.division.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DivisionDeleteManyArgs>(args?: SelectSubset<T, DivisionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Divisions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DivisionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Divisions
     * const division = await prisma.division.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DivisionUpdateManyArgs>(args: SelectSubset<T, DivisionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Divisions and returns the data updated in the database.
     * @param {DivisionUpdateManyAndReturnArgs} args - Arguments to update many Divisions.
     * @example
     * // Update many Divisions
     * const division = await prisma.division.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Divisions and only return the `id`
     * const divisionWithIdOnly = await prisma.division.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DivisionUpdateManyAndReturnArgs>(args: SelectSubset<T, DivisionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DivisionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Division.
     * @param {DivisionUpsertArgs} args - Arguments to update or create a Division.
     * @example
     * // Update or create a Division
     * const division = await prisma.division.upsert({
     *   create: {
     *     // ... data to create a Division
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Division we want to update
     *   }
     * })
     */
    upsert<T extends DivisionUpsertArgs>(args: SelectSubset<T, DivisionUpsertArgs<ExtArgs>>): Prisma__DivisionClient<$Result.GetResult<Prisma.$DivisionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Divisions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DivisionCountArgs} args - Arguments to filter Divisions to count.
     * @example
     * // Count the number of Divisions
     * const count = await prisma.division.count({
     *   where: {
     *     // ... the filter for the Divisions we want to count
     *   }
     * })
    **/
    count<T extends DivisionCountArgs>(
      args?: Subset<T, DivisionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DivisionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Division.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DivisionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DivisionAggregateArgs>(args: Subset<T, DivisionAggregateArgs>): Prisma.PrismaPromise<GetDivisionAggregateType<T>>

    /**
     * Group by Division.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DivisionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DivisionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DivisionGroupByArgs['orderBy'] }
        : { orderBy?: DivisionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DivisionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDivisionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Division model
   */
  readonly fields: DivisionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Division.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DivisionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Division model
   */
  interface DivisionFieldRefs {
    readonly id: FieldRef<"Division", 'Int'>
    readonly name: FieldRef<"Division", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Division findUnique
   */
  export type DivisionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Division
     */
    select?: DivisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Division
     */
    omit?: DivisionOmit<ExtArgs> | null
    /**
     * Filter, which Division to fetch.
     */
    where: DivisionWhereUniqueInput
  }

  /**
   * Division findUniqueOrThrow
   */
  export type DivisionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Division
     */
    select?: DivisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Division
     */
    omit?: DivisionOmit<ExtArgs> | null
    /**
     * Filter, which Division to fetch.
     */
    where: DivisionWhereUniqueInput
  }

  /**
   * Division findFirst
   */
  export type DivisionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Division
     */
    select?: DivisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Division
     */
    omit?: DivisionOmit<ExtArgs> | null
    /**
     * Filter, which Division to fetch.
     */
    where?: DivisionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Divisions to fetch.
     */
    orderBy?: DivisionOrderByWithRelationInput | DivisionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Divisions.
     */
    cursor?: DivisionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Divisions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Divisions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Divisions.
     */
    distinct?: DivisionScalarFieldEnum | DivisionScalarFieldEnum[]
  }

  /**
   * Division findFirstOrThrow
   */
  export type DivisionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Division
     */
    select?: DivisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Division
     */
    omit?: DivisionOmit<ExtArgs> | null
    /**
     * Filter, which Division to fetch.
     */
    where?: DivisionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Divisions to fetch.
     */
    orderBy?: DivisionOrderByWithRelationInput | DivisionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Divisions.
     */
    cursor?: DivisionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Divisions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Divisions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Divisions.
     */
    distinct?: DivisionScalarFieldEnum | DivisionScalarFieldEnum[]
  }

  /**
   * Division findMany
   */
  export type DivisionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Division
     */
    select?: DivisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Division
     */
    omit?: DivisionOmit<ExtArgs> | null
    /**
     * Filter, which Divisions to fetch.
     */
    where?: DivisionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Divisions to fetch.
     */
    orderBy?: DivisionOrderByWithRelationInput | DivisionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Divisions.
     */
    cursor?: DivisionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Divisions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Divisions.
     */
    skip?: number
    distinct?: DivisionScalarFieldEnum | DivisionScalarFieldEnum[]
  }

  /**
   * Division create
   */
  export type DivisionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Division
     */
    select?: DivisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Division
     */
    omit?: DivisionOmit<ExtArgs> | null
    /**
     * The data needed to create a Division.
     */
    data: XOR<DivisionCreateInput, DivisionUncheckedCreateInput>
  }

  /**
   * Division createMany
   */
  export type DivisionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Divisions.
     */
    data: DivisionCreateManyInput | DivisionCreateManyInput[]
  }

  /**
   * Division createManyAndReturn
   */
  export type DivisionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Division
     */
    select?: DivisionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Division
     */
    omit?: DivisionOmit<ExtArgs> | null
    /**
     * The data used to create many Divisions.
     */
    data: DivisionCreateManyInput | DivisionCreateManyInput[]
  }

  /**
   * Division update
   */
  export type DivisionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Division
     */
    select?: DivisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Division
     */
    omit?: DivisionOmit<ExtArgs> | null
    /**
     * The data needed to update a Division.
     */
    data: XOR<DivisionUpdateInput, DivisionUncheckedUpdateInput>
    /**
     * Choose, which Division to update.
     */
    where: DivisionWhereUniqueInput
  }

  /**
   * Division updateMany
   */
  export type DivisionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Divisions.
     */
    data: XOR<DivisionUpdateManyMutationInput, DivisionUncheckedUpdateManyInput>
    /**
     * Filter which Divisions to update
     */
    where?: DivisionWhereInput
    /**
     * Limit how many Divisions to update.
     */
    limit?: number
  }

  /**
   * Division updateManyAndReturn
   */
  export type DivisionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Division
     */
    select?: DivisionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Division
     */
    omit?: DivisionOmit<ExtArgs> | null
    /**
     * The data used to update Divisions.
     */
    data: XOR<DivisionUpdateManyMutationInput, DivisionUncheckedUpdateManyInput>
    /**
     * Filter which Divisions to update
     */
    where?: DivisionWhereInput
    /**
     * Limit how many Divisions to update.
     */
    limit?: number
  }

  /**
   * Division upsert
   */
  export type DivisionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Division
     */
    select?: DivisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Division
     */
    omit?: DivisionOmit<ExtArgs> | null
    /**
     * The filter to search for the Division to update in case it exists.
     */
    where: DivisionWhereUniqueInput
    /**
     * In case the Division found by the `where` argument doesn't exist, create a new Division with this data.
     */
    create: XOR<DivisionCreateInput, DivisionUncheckedCreateInput>
    /**
     * In case the Division was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DivisionUpdateInput, DivisionUncheckedUpdateInput>
  }

  /**
   * Division delete
   */
  export type DivisionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Division
     */
    select?: DivisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Division
     */
    omit?: DivisionOmit<ExtArgs> | null
    /**
     * Filter which Division to delete.
     */
    where: DivisionWhereUniqueInput
  }

  /**
   * Division deleteMany
   */
  export type DivisionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Divisions to delete
     */
    where?: DivisionWhereInput
    /**
     * Limit how many Divisions to delete.
     */
    limit?: number
  }

  /**
   * Division without action
   */
  export type DivisionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Division
     */
    select?: DivisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Division
     */
    omit?: DivisionOmit<ExtArgs> | null
  }


  /**
   * Model Designation
   */

  export type AggregateDesignation = {
    _count: DesignationCountAggregateOutputType | null
    _avg: DesignationAvgAggregateOutputType | null
    _sum: DesignationSumAggregateOutputType | null
    _min: DesignationMinAggregateOutputType | null
    _max: DesignationMaxAggregateOutputType | null
  }

  export type DesignationAvgAggregateOutputType = {
    id: number | null
    workclass: number | null
  }

  export type DesignationSumAggregateOutputType = {
    id: number | null
    workclass: number | null
  }

  export type DesignationMinAggregateOutputType = {
    id: number | null
    title: string | null
    workclass: number | null
  }

  export type DesignationMaxAggregateOutputType = {
    id: number | null
    title: string | null
    workclass: number | null
  }

  export type DesignationCountAggregateOutputType = {
    id: number
    title: number
    workclass: number
    _all: number
  }


  export type DesignationAvgAggregateInputType = {
    id?: true
    workclass?: true
  }

  export type DesignationSumAggregateInputType = {
    id?: true
    workclass?: true
  }

  export type DesignationMinAggregateInputType = {
    id?: true
    title?: true
    workclass?: true
  }

  export type DesignationMaxAggregateInputType = {
    id?: true
    title?: true
    workclass?: true
  }

  export type DesignationCountAggregateInputType = {
    id?: true
    title?: true
    workclass?: true
    _all?: true
  }

  export type DesignationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Designation to aggregate.
     */
    where?: DesignationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Designations to fetch.
     */
    orderBy?: DesignationOrderByWithRelationInput | DesignationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DesignationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Designations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Designations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Designations
    **/
    _count?: true | DesignationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DesignationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DesignationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DesignationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DesignationMaxAggregateInputType
  }

  export type GetDesignationAggregateType<T extends DesignationAggregateArgs> = {
        [P in keyof T & keyof AggregateDesignation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDesignation[P]>
      : GetScalarType<T[P], AggregateDesignation[P]>
  }




  export type DesignationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DesignationWhereInput
    orderBy?: DesignationOrderByWithAggregationInput | DesignationOrderByWithAggregationInput[]
    by: DesignationScalarFieldEnum[] | DesignationScalarFieldEnum
    having?: DesignationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DesignationCountAggregateInputType | true
    _avg?: DesignationAvgAggregateInputType
    _sum?: DesignationSumAggregateInputType
    _min?: DesignationMinAggregateInputType
    _max?: DesignationMaxAggregateInputType
  }

  export type DesignationGroupByOutputType = {
    id: number
    title: string
    workclass: number
    _count: DesignationCountAggregateOutputType | null
    _avg: DesignationAvgAggregateOutputType | null
    _sum: DesignationSumAggregateOutputType | null
    _min: DesignationMinAggregateOutputType | null
    _max: DesignationMaxAggregateOutputType | null
  }

  type GetDesignationGroupByPayload<T extends DesignationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DesignationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DesignationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DesignationGroupByOutputType[P]>
            : GetScalarType<T[P], DesignationGroupByOutputType[P]>
        }
      >
    >


  export type DesignationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    workclass?: boolean
  }, ExtArgs["result"]["designation"]>

  export type DesignationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    workclass?: boolean
  }, ExtArgs["result"]["designation"]>

  export type DesignationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    workclass?: boolean
  }, ExtArgs["result"]["designation"]>

  export type DesignationSelectScalar = {
    id?: boolean
    title?: boolean
    workclass?: boolean
  }

  export type DesignationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "workclass", ExtArgs["result"]["designation"]>

  export type $DesignationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Designation"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      workclass: number
    }, ExtArgs["result"]["designation"]>
    composites: {}
  }

  type DesignationGetPayload<S extends boolean | null | undefined | DesignationDefaultArgs> = $Result.GetResult<Prisma.$DesignationPayload, S>

  type DesignationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DesignationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DesignationCountAggregateInputType | true
    }

  export interface DesignationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Designation'], meta: { name: 'Designation' } }
    /**
     * Find zero or one Designation that matches the filter.
     * @param {DesignationFindUniqueArgs} args - Arguments to find a Designation
     * @example
     * // Get one Designation
     * const designation = await prisma.designation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DesignationFindUniqueArgs>(args: SelectSubset<T, DesignationFindUniqueArgs<ExtArgs>>): Prisma__DesignationClient<$Result.GetResult<Prisma.$DesignationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Designation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DesignationFindUniqueOrThrowArgs} args - Arguments to find a Designation
     * @example
     * // Get one Designation
     * const designation = await prisma.designation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DesignationFindUniqueOrThrowArgs>(args: SelectSubset<T, DesignationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DesignationClient<$Result.GetResult<Prisma.$DesignationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Designation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DesignationFindFirstArgs} args - Arguments to find a Designation
     * @example
     * // Get one Designation
     * const designation = await prisma.designation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DesignationFindFirstArgs>(args?: SelectSubset<T, DesignationFindFirstArgs<ExtArgs>>): Prisma__DesignationClient<$Result.GetResult<Prisma.$DesignationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Designation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DesignationFindFirstOrThrowArgs} args - Arguments to find a Designation
     * @example
     * // Get one Designation
     * const designation = await prisma.designation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DesignationFindFirstOrThrowArgs>(args?: SelectSubset<T, DesignationFindFirstOrThrowArgs<ExtArgs>>): Prisma__DesignationClient<$Result.GetResult<Prisma.$DesignationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Designations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DesignationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Designations
     * const designations = await prisma.designation.findMany()
     * 
     * // Get first 10 Designations
     * const designations = await prisma.designation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const designationWithIdOnly = await prisma.designation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DesignationFindManyArgs>(args?: SelectSubset<T, DesignationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DesignationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Designation.
     * @param {DesignationCreateArgs} args - Arguments to create a Designation.
     * @example
     * // Create one Designation
     * const Designation = await prisma.designation.create({
     *   data: {
     *     // ... data to create a Designation
     *   }
     * })
     * 
     */
    create<T extends DesignationCreateArgs>(args: SelectSubset<T, DesignationCreateArgs<ExtArgs>>): Prisma__DesignationClient<$Result.GetResult<Prisma.$DesignationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Designations.
     * @param {DesignationCreateManyArgs} args - Arguments to create many Designations.
     * @example
     * // Create many Designations
     * const designation = await prisma.designation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DesignationCreateManyArgs>(args?: SelectSubset<T, DesignationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Designations and returns the data saved in the database.
     * @param {DesignationCreateManyAndReturnArgs} args - Arguments to create many Designations.
     * @example
     * // Create many Designations
     * const designation = await prisma.designation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Designations and only return the `id`
     * const designationWithIdOnly = await prisma.designation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DesignationCreateManyAndReturnArgs>(args?: SelectSubset<T, DesignationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DesignationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Designation.
     * @param {DesignationDeleteArgs} args - Arguments to delete one Designation.
     * @example
     * // Delete one Designation
     * const Designation = await prisma.designation.delete({
     *   where: {
     *     // ... filter to delete one Designation
     *   }
     * })
     * 
     */
    delete<T extends DesignationDeleteArgs>(args: SelectSubset<T, DesignationDeleteArgs<ExtArgs>>): Prisma__DesignationClient<$Result.GetResult<Prisma.$DesignationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Designation.
     * @param {DesignationUpdateArgs} args - Arguments to update one Designation.
     * @example
     * // Update one Designation
     * const designation = await prisma.designation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DesignationUpdateArgs>(args: SelectSubset<T, DesignationUpdateArgs<ExtArgs>>): Prisma__DesignationClient<$Result.GetResult<Prisma.$DesignationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Designations.
     * @param {DesignationDeleteManyArgs} args - Arguments to filter Designations to delete.
     * @example
     * // Delete a few Designations
     * const { count } = await prisma.designation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DesignationDeleteManyArgs>(args?: SelectSubset<T, DesignationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Designations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DesignationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Designations
     * const designation = await prisma.designation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DesignationUpdateManyArgs>(args: SelectSubset<T, DesignationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Designations and returns the data updated in the database.
     * @param {DesignationUpdateManyAndReturnArgs} args - Arguments to update many Designations.
     * @example
     * // Update many Designations
     * const designation = await prisma.designation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Designations and only return the `id`
     * const designationWithIdOnly = await prisma.designation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DesignationUpdateManyAndReturnArgs>(args: SelectSubset<T, DesignationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DesignationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Designation.
     * @param {DesignationUpsertArgs} args - Arguments to update or create a Designation.
     * @example
     * // Update or create a Designation
     * const designation = await prisma.designation.upsert({
     *   create: {
     *     // ... data to create a Designation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Designation we want to update
     *   }
     * })
     */
    upsert<T extends DesignationUpsertArgs>(args: SelectSubset<T, DesignationUpsertArgs<ExtArgs>>): Prisma__DesignationClient<$Result.GetResult<Prisma.$DesignationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Designations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DesignationCountArgs} args - Arguments to filter Designations to count.
     * @example
     * // Count the number of Designations
     * const count = await prisma.designation.count({
     *   where: {
     *     // ... the filter for the Designations we want to count
     *   }
     * })
    **/
    count<T extends DesignationCountArgs>(
      args?: Subset<T, DesignationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DesignationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Designation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DesignationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DesignationAggregateArgs>(args: Subset<T, DesignationAggregateArgs>): Prisma.PrismaPromise<GetDesignationAggregateType<T>>

    /**
     * Group by Designation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DesignationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DesignationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DesignationGroupByArgs['orderBy'] }
        : { orderBy?: DesignationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DesignationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDesignationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Designation model
   */
  readonly fields: DesignationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Designation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DesignationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Designation model
   */
  interface DesignationFieldRefs {
    readonly id: FieldRef<"Designation", 'Int'>
    readonly title: FieldRef<"Designation", 'String'>
    readonly workclass: FieldRef<"Designation", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Designation findUnique
   */
  export type DesignationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Designation
     */
    select?: DesignationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Designation
     */
    omit?: DesignationOmit<ExtArgs> | null
    /**
     * Filter, which Designation to fetch.
     */
    where: DesignationWhereUniqueInput
  }

  /**
   * Designation findUniqueOrThrow
   */
  export type DesignationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Designation
     */
    select?: DesignationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Designation
     */
    omit?: DesignationOmit<ExtArgs> | null
    /**
     * Filter, which Designation to fetch.
     */
    where: DesignationWhereUniqueInput
  }

  /**
   * Designation findFirst
   */
  export type DesignationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Designation
     */
    select?: DesignationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Designation
     */
    omit?: DesignationOmit<ExtArgs> | null
    /**
     * Filter, which Designation to fetch.
     */
    where?: DesignationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Designations to fetch.
     */
    orderBy?: DesignationOrderByWithRelationInput | DesignationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Designations.
     */
    cursor?: DesignationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Designations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Designations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Designations.
     */
    distinct?: DesignationScalarFieldEnum | DesignationScalarFieldEnum[]
  }

  /**
   * Designation findFirstOrThrow
   */
  export type DesignationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Designation
     */
    select?: DesignationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Designation
     */
    omit?: DesignationOmit<ExtArgs> | null
    /**
     * Filter, which Designation to fetch.
     */
    where?: DesignationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Designations to fetch.
     */
    orderBy?: DesignationOrderByWithRelationInput | DesignationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Designations.
     */
    cursor?: DesignationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Designations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Designations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Designations.
     */
    distinct?: DesignationScalarFieldEnum | DesignationScalarFieldEnum[]
  }

  /**
   * Designation findMany
   */
  export type DesignationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Designation
     */
    select?: DesignationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Designation
     */
    omit?: DesignationOmit<ExtArgs> | null
    /**
     * Filter, which Designations to fetch.
     */
    where?: DesignationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Designations to fetch.
     */
    orderBy?: DesignationOrderByWithRelationInput | DesignationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Designations.
     */
    cursor?: DesignationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Designations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Designations.
     */
    skip?: number
    distinct?: DesignationScalarFieldEnum | DesignationScalarFieldEnum[]
  }

  /**
   * Designation create
   */
  export type DesignationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Designation
     */
    select?: DesignationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Designation
     */
    omit?: DesignationOmit<ExtArgs> | null
    /**
     * The data needed to create a Designation.
     */
    data: XOR<DesignationCreateInput, DesignationUncheckedCreateInput>
  }

  /**
   * Designation createMany
   */
  export type DesignationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Designations.
     */
    data: DesignationCreateManyInput | DesignationCreateManyInput[]
  }

  /**
   * Designation createManyAndReturn
   */
  export type DesignationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Designation
     */
    select?: DesignationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Designation
     */
    omit?: DesignationOmit<ExtArgs> | null
    /**
     * The data used to create many Designations.
     */
    data: DesignationCreateManyInput | DesignationCreateManyInput[]
  }

  /**
   * Designation update
   */
  export type DesignationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Designation
     */
    select?: DesignationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Designation
     */
    omit?: DesignationOmit<ExtArgs> | null
    /**
     * The data needed to update a Designation.
     */
    data: XOR<DesignationUpdateInput, DesignationUncheckedUpdateInput>
    /**
     * Choose, which Designation to update.
     */
    where: DesignationWhereUniqueInput
  }

  /**
   * Designation updateMany
   */
  export type DesignationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Designations.
     */
    data: XOR<DesignationUpdateManyMutationInput, DesignationUncheckedUpdateManyInput>
    /**
     * Filter which Designations to update
     */
    where?: DesignationWhereInput
    /**
     * Limit how many Designations to update.
     */
    limit?: number
  }

  /**
   * Designation updateManyAndReturn
   */
  export type DesignationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Designation
     */
    select?: DesignationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Designation
     */
    omit?: DesignationOmit<ExtArgs> | null
    /**
     * The data used to update Designations.
     */
    data: XOR<DesignationUpdateManyMutationInput, DesignationUncheckedUpdateManyInput>
    /**
     * Filter which Designations to update
     */
    where?: DesignationWhereInput
    /**
     * Limit how many Designations to update.
     */
    limit?: number
  }

  /**
   * Designation upsert
   */
  export type DesignationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Designation
     */
    select?: DesignationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Designation
     */
    omit?: DesignationOmit<ExtArgs> | null
    /**
     * The filter to search for the Designation to update in case it exists.
     */
    where: DesignationWhereUniqueInput
    /**
     * In case the Designation found by the `where` argument doesn't exist, create a new Designation with this data.
     */
    create: XOR<DesignationCreateInput, DesignationUncheckedCreateInput>
    /**
     * In case the Designation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DesignationUpdateInput, DesignationUncheckedUpdateInput>
  }

  /**
   * Designation delete
   */
  export type DesignationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Designation
     */
    select?: DesignationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Designation
     */
    omit?: DesignationOmit<ExtArgs> | null
    /**
     * Filter which Designation to delete.
     */
    where: DesignationWhereUniqueInput
  }

  /**
   * Designation deleteMany
   */
  export type DesignationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Designations to delete
     */
    where?: DesignationWhereInput
    /**
     * Limit how many Designations to delete.
     */
    limit?: number
  }

  /**
   * Designation without action
   */
  export type DesignationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Designation
     */
    select?: DesignationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Designation
     */
    omit?: DesignationOmit<ExtArgs> | null
  }


  /**
   * Model Campaign
   */

  export type AggregateCampaign = {
    _count: CampaignCountAggregateOutputType | null
    _avg: CampaignAvgAggregateOutputType | null
    _sum: CampaignSumAggregateOutputType | null
    _min: CampaignMinAggregateOutputType | null
    _max: CampaignMaxAggregateOutputType | null
  }

  export type CampaignAvgAggregateOutputType = {
    overall_target: number | null
  }

  export type CampaignSumAggregateOutputType = {
    overall_target: number | null
  }

  export type CampaignMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    department_code: string | null
    startDate: string | null
    endDate: string | null
    type: string | null
    unit: string | null
    status: string | null
    image: string | null
    overall_target: number | null
    data: string | null
    achievement_entries: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CampaignMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    department_code: string | null
    startDate: string | null
    endDate: string | null
    type: string | null
    unit: string | null
    status: string | null
    image: string | null
    overall_target: number | null
    data: string | null
    achievement_entries: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CampaignCountAggregateOutputType = {
    id: number
    title: number
    description: number
    department_code: number
    startDate: number
    endDate: number
    type: number
    unit: number
    status: number
    image: number
    overall_target: number
    data: number
    achievement_entries: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CampaignAvgAggregateInputType = {
    overall_target?: true
  }

  export type CampaignSumAggregateInputType = {
    overall_target?: true
  }

  export type CampaignMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    department_code?: true
    startDate?: true
    endDate?: true
    type?: true
    unit?: true
    status?: true
    image?: true
    overall_target?: true
    data?: true
    achievement_entries?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CampaignMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    department_code?: true
    startDate?: true
    endDate?: true
    type?: true
    unit?: true
    status?: true
    image?: true
    overall_target?: true
    data?: true
    achievement_entries?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CampaignCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    department_code?: true
    startDate?: true
    endDate?: true
    type?: true
    unit?: true
    status?: true
    image?: true
    overall_target?: true
    data?: true
    achievement_entries?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CampaignAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Campaign to aggregate.
     */
    where?: CampaignWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Campaigns to fetch.
     */
    orderBy?: CampaignOrderByWithRelationInput | CampaignOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CampaignWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Campaigns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Campaigns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Campaigns
    **/
    _count?: true | CampaignCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CampaignAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CampaignSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CampaignMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CampaignMaxAggregateInputType
  }

  export type GetCampaignAggregateType<T extends CampaignAggregateArgs> = {
        [P in keyof T & keyof AggregateCampaign]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCampaign[P]>
      : GetScalarType<T[P], AggregateCampaign[P]>
  }




  export type CampaignGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CampaignWhereInput
    orderBy?: CampaignOrderByWithAggregationInput | CampaignOrderByWithAggregationInput[]
    by: CampaignScalarFieldEnum[] | CampaignScalarFieldEnum
    having?: CampaignScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CampaignCountAggregateInputType | true
    _avg?: CampaignAvgAggregateInputType
    _sum?: CampaignSumAggregateInputType
    _min?: CampaignMinAggregateInputType
    _max?: CampaignMaxAggregateInputType
  }

  export type CampaignGroupByOutputType = {
    id: string
    title: string
    description: string | null
    department_code: string | null
    startDate: string | null
    endDate: string | null
    type: string | null
    unit: string | null
    status: string | null
    image: string | null
    overall_target: number | null
    data: string | null
    achievement_entries: string | null
    createdAt: Date
    updatedAt: Date
    _count: CampaignCountAggregateOutputType | null
    _avg: CampaignAvgAggregateOutputType | null
    _sum: CampaignSumAggregateOutputType | null
    _min: CampaignMinAggregateOutputType | null
    _max: CampaignMaxAggregateOutputType | null
  }

  type GetCampaignGroupByPayload<T extends CampaignGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CampaignGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CampaignGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CampaignGroupByOutputType[P]>
            : GetScalarType<T[P], CampaignGroupByOutputType[P]>
        }
      >
    >


  export type CampaignSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    department_code?: boolean
    startDate?: boolean
    endDate?: boolean
    type?: boolean
    unit?: boolean
    status?: boolean
    image?: boolean
    overall_target?: boolean
    data?: boolean
    achievement_entries?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["campaign"]>

  export type CampaignSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    department_code?: boolean
    startDate?: boolean
    endDate?: boolean
    type?: boolean
    unit?: boolean
    status?: boolean
    image?: boolean
    overall_target?: boolean
    data?: boolean
    achievement_entries?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["campaign"]>

  export type CampaignSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    department_code?: boolean
    startDate?: boolean
    endDate?: boolean
    type?: boolean
    unit?: boolean
    status?: boolean
    image?: boolean
    overall_target?: boolean
    data?: boolean
    achievement_entries?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["campaign"]>

  export type CampaignSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    department_code?: boolean
    startDate?: boolean
    endDate?: boolean
    type?: boolean
    unit?: boolean
    status?: boolean
    image?: boolean
    overall_target?: boolean
    data?: boolean
    achievement_entries?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CampaignOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "department_code" | "startDate" | "endDate" | "type" | "unit" | "status" | "image" | "overall_target" | "data" | "achievement_entries" | "createdAt" | "updatedAt", ExtArgs["result"]["campaign"]>

  export type $CampaignPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Campaign"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string | null
      department_code: string | null
      startDate: string | null
      endDate: string | null
      type: string | null
      unit: string | null
      status: string | null
      image: string | null
      overall_target: number | null
      data: string | null
      achievement_entries: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["campaign"]>
    composites: {}
  }

  type CampaignGetPayload<S extends boolean | null | undefined | CampaignDefaultArgs> = $Result.GetResult<Prisma.$CampaignPayload, S>

  type CampaignCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CampaignFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CampaignCountAggregateInputType | true
    }

  export interface CampaignDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Campaign'], meta: { name: 'Campaign' } }
    /**
     * Find zero or one Campaign that matches the filter.
     * @param {CampaignFindUniqueArgs} args - Arguments to find a Campaign
     * @example
     * // Get one Campaign
     * const campaign = await prisma.campaign.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CampaignFindUniqueArgs>(args: SelectSubset<T, CampaignFindUniqueArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Campaign that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CampaignFindUniqueOrThrowArgs} args - Arguments to find a Campaign
     * @example
     * // Get one Campaign
     * const campaign = await prisma.campaign.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CampaignFindUniqueOrThrowArgs>(args: SelectSubset<T, CampaignFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Campaign that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignFindFirstArgs} args - Arguments to find a Campaign
     * @example
     * // Get one Campaign
     * const campaign = await prisma.campaign.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CampaignFindFirstArgs>(args?: SelectSubset<T, CampaignFindFirstArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Campaign that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignFindFirstOrThrowArgs} args - Arguments to find a Campaign
     * @example
     * // Get one Campaign
     * const campaign = await prisma.campaign.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CampaignFindFirstOrThrowArgs>(args?: SelectSubset<T, CampaignFindFirstOrThrowArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Campaigns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Campaigns
     * const campaigns = await prisma.campaign.findMany()
     * 
     * // Get first 10 Campaigns
     * const campaigns = await prisma.campaign.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const campaignWithIdOnly = await prisma.campaign.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CampaignFindManyArgs>(args?: SelectSubset<T, CampaignFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Campaign.
     * @param {CampaignCreateArgs} args - Arguments to create a Campaign.
     * @example
     * // Create one Campaign
     * const Campaign = await prisma.campaign.create({
     *   data: {
     *     // ... data to create a Campaign
     *   }
     * })
     * 
     */
    create<T extends CampaignCreateArgs>(args: SelectSubset<T, CampaignCreateArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Campaigns.
     * @param {CampaignCreateManyArgs} args - Arguments to create many Campaigns.
     * @example
     * // Create many Campaigns
     * const campaign = await prisma.campaign.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CampaignCreateManyArgs>(args?: SelectSubset<T, CampaignCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Campaigns and returns the data saved in the database.
     * @param {CampaignCreateManyAndReturnArgs} args - Arguments to create many Campaigns.
     * @example
     * // Create many Campaigns
     * const campaign = await prisma.campaign.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Campaigns and only return the `id`
     * const campaignWithIdOnly = await prisma.campaign.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CampaignCreateManyAndReturnArgs>(args?: SelectSubset<T, CampaignCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Campaign.
     * @param {CampaignDeleteArgs} args - Arguments to delete one Campaign.
     * @example
     * // Delete one Campaign
     * const Campaign = await prisma.campaign.delete({
     *   where: {
     *     // ... filter to delete one Campaign
     *   }
     * })
     * 
     */
    delete<T extends CampaignDeleteArgs>(args: SelectSubset<T, CampaignDeleteArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Campaign.
     * @param {CampaignUpdateArgs} args - Arguments to update one Campaign.
     * @example
     * // Update one Campaign
     * const campaign = await prisma.campaign.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CampaignUpdateArgs>(args: SelectSubset<T, CampaignUpdateArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Campaigns.
     * @param {CampaignDeleteManyArgs} args - Arguments to filter Campaigns to delete.
     * @example
     * // Delete a few Campaigns
     * const { count } = await prisma.campaign.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CampaignDeleteManyArgs>(args?: SelectSubset<T, CampaignDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Campaigns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Campaigns
     * const campaign = await prisma.campaign.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CampaignUpdateManyArgs>(args: SelectSubset<T, CampaignUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Campaigns and returns the data updated in the database.
     * @param {CampaignUpdateManyAndReturnArgs} args - Arguments to update many Campaigns.
     * @example
     * // Update many Campaigns
     * const campaign = await prisma.campaign.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Campaigns and only return the `id`
     * const campaignWithIdOnly = await prisma.campaign.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CampaignUpdateManyAndReturnArgs>(args: SelectSubset<T, CampaignUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Campaign.
     * @param {CampaignUpsertArgs} args - Arguments to update or create a Campaign.
     * @example
     * // Update or create a Campaign
     * const campaign = await prisma.campaign.upsert({
     *   create: {
     *     // ... data to create a Campaign
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Campaign we want to update
     *   }
     * })
     */
    upsert<T extends CampaignUpsertArgs>(args: SelectSubset<T, CampaignUpsertArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Campaigns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignCountArgs} args - Arguments to filter Campaigns to count.
     * @example
     * // Count the number of Campaigns
     * const count = await prisma.campaign.count({
     *   where: {
     *     // ... the filter for the Campaigns we want to count
     *   }
     * })
    **/
    count<T extends CampaignCountArgs>(
      args?: Subset<T, CampaignCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CampaignCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Campaign.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CampaignAggregateArgs>(args: Subset<T, CampaignAggregateArgs>): Prisma.PrismaPromise<GetCampaignAggregateType<T>>

    /**
     * Group by Campaign.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CampaignGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CampaignGroupByArgs['orderBy'] }
        : { orderBy?: CampaignGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CampaignGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCampaignGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Campaign model
   */
  readonly fields: CampaignFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Campaign.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CampaignClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Campaign model
   */
  interface CampaignFieldRefs {
    readonly id: FieldRef<"Campaign", 'String'>
    readonly title: FieldRef<"Campaign", 'String'>
    readonly description: FieldRef<"Campaign", 'String'>
    readonly department_code: FieldRef<"Campaign", 'String'>
    readonly startDate: FieldRef<"Campaign", 'String'>
    readonly endDate: FieldRef<"Campaign", 'String'>
    readonly type: FieldRef<"Campaign", 'String'>
    readonly unit: FieldRef<"Campaign", 'String'>
    readonly status: FieldRef<"Campaign", 'String'>
    readonly image: FieldRef<"Campaign", 'String'>
    readonly overall_target: FieldRef<"Campaign", 'Float'>
    readonly data: FieldRef<"Campaign", 'String'>
    readonly achievement_entries: FieldRef<"Campaign", 'String'>
    readonly createdAt: FieldRef<"Campaign", 'DateTime'>
    readonly updatedAt: FieldRef<"Campaign", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Campaign findUnique
   */
  export type CampaignFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Filter, which Campaign to fetch.
     */
    where: CampaignWhereUniqueInput
  }

  /**
   * Campaign findUniqueOrThrow
   */
  export type CampaignFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Filter, which Campaign to fetch.
     */
    where: CampaignWhereUniqueInput
  }

  /**
   * Campaign findFirst
   */
  export type CampaignFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Filter, which Campaign to fetch.
     */
    where?: CampaignWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Campaigns to fetch.
     */
    orderBy?: CampaignOrderByWithRelationInput | CampaignOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Campaigns.
     */
    cursor?: CampaignWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Campaigns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Campaigns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Campaigns.
     */
    distinct?: CampaignScalarFieldEnum | CampaignScalarFieldEnum[]
  }

  /**
   * Campaign findFirstOrThrow
   */
  export type CampaignFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Filter, which Campaign to fetch.
     */
    where?: CampaignWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Campaigns to fetch.
     */
    orderBy?: CampaignOrderByWithRelationInput | CampaignOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Campaigns.
     */
    cursor?: CampaignWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Campaigns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Campaigns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Campaigns.
     */
    distinct?: CampaignScalarFieldEnum | CampaignScalarFieldEnum[]
  }

  /**
   * Campaign findMany
   */
  export type CampaignFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Filter, which Campaigns to fetch.
     */
    where?: CampaignWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Campaigns to fetch.
     */
    orderBy?: CampaignOrderByWithRelationInput | CampaignOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Campaigns.
     */
    cursor?: CampaignWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Campaigns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Campaigns.
     */
    skip?: number
    distinct?: CampaignScalarFieldEnum | CampaignScalarFieldEnum[]
  }

  /**
   * Campaign create
   */
  export type CampaignCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * The data needed to create a Campaign.
     */
    data: XOR<CampaignCreateInput, CampaignUncheckedCreateInput>
  }

  /**
   * Campaign createMany
   */
  export type CampaignCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Campaigns.
     */
    data: CampaignCreateManyInput | CampaignCreateManyInput[]
  }

  /**
   * Campaign createManyAndReturn
   */
  export type CampaignCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * The data used to create many Campaigns.
     */
    data: CampaignCreateManyInput | CampaignCreateManyInput[]
  }

  /**
   * Campaign update
   */
  export type CampaignUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * The data needed to update a Campaign.
     */
    data: XOR<CampaignUpdateInput, CampaignUncheckedUpdateInput>
    /**
     * Choose, which Campaign to update.
     */
    where: CampaignWhereUniqueInput
  }

  /**
   * Campaign updateMany
   */
  export type CampaignUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Campaigns.
     */
    data: XOR<CampaignUpdateManyMutationInput, CampaignUncheckedUpdateManyInput>
    /**
     * Filter which Campaigns to update
     */
    where?: CampaignWhereInput
    /**
     * Limit how many Campaigns to update.
     */
    limit?: number
  }

  /**
   * Campaign updateManyAndReturn
   */
  export type CampaignUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * The data used to update Campaigns.
     */
    data: XOR<CampaignUpdateManyMutationInput, CampaignUncheckedUpdateManyInput>
    /**
     * Filter which Campaigns to update
     */
    where?: CampaignWhereInput
    /**
     * Limit how many Campaigns to update.
     */
    limit?: number
  }

  /**
   * Campaign upsert
   */
  export type CampaignUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * The filter to search for the Campaign to update in case it exists.
     */
    where: CampaignWhereUniqueInput
    /**
     * In case the Campaign found by the `where` argument doesn't exist, create a new Campaign with this data.
     */
    create: XOR<CampaignCreateInput, CampaignUncheckedCreateInput>
    /**
     * In case the Campaign was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CampaignUpdateInput, CampaignUncheckedUpdateInput>
  }

  /**
   * Campaign delete
   */
  export type CampaignDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Filter which Campaign to delete.
     */
    where: CampaignWhereUniqueInput
  }

  /**
   * Campaign deleteMany
   */
  export type CampaignDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Campaigns to delete
     */
    where?: CampaignWhereInput
    /**
     * Limit how many Campaigns to delete.
     */
    limit?: number
  }

  /**
   * Campaign without action
   */
  export type CampaignDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
  }


  /**
   * Model Document
   */

  export type AggregateDocument = {
    _count: DocumentCountAggregateOutputType | null
    _min: DocumentMinAggregateOutputType | null
    _max: DocumentMaxAggregateOutputType | null
  }

  export type DocumentMinAggregateOutputType = {
    id: string | null
    category: string | null
    type: string | null
    subject: string | null
    content: string | null
    refNo: string | null
    status: string | null
    formData: string | null
    is_deleted: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DocumentMaxAggregateOutputType = {
    id: string | null
    category: string | null
    type: string | null
    subject: string | null
    content: string | null
    refNo: string | null
    status: string | null
    formData: string | null
    is_deleted: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DocumentCountAggregateOutputType = {
    id: number
    category: number
    type: number
    subject: number
    content: number
    refNo: number
    status: number
    formData: number
    is_deleted: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DocumentMinAggregateInputType = {
    id?: true
    category?: true
    type?: true
    subject?: true
    content?: true
    refNo?: true
    status?: true
    formData?: true
    is_deleted?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DocumentMaxAggregateInputType = {
    id?: true
    category?: true
    type?: true
    subject?: true
    content?: true
    refNo?: true
    status?: true
    formData?: true
    is_deleted?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DocumentCountAggregateInputType = {
    id?: true
    category?: true
    type?: true
    subject?: true
    content?: true
    refNo?: true
    status?: true
    formData?: true
    is_deleted?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DocumentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Document to aggregate.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Documents
    **/
    _count?: true | DocumentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DocumentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DocumentMaxAggregateInputType
  }

  export type GetDocumentAggregateType<T extends DocumentAggregateArgs> = {
        [P in keyof T & keyof AggregateDocument]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocument[P]>
      : GetScalarType<T[P], AggregateDocument[P]>
  }




  export type DocumentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithAggregationInput | DocumentOrderByWithAggregationInput[]
    by: DocumentScalarFieldEnum[] | DocumentScalarFieldEnum
    having?: DocumentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DocumentCountAggregateInputType | true
    _min?: DocumentMinAggregateInputType
    _max?: DocumentMaxAggregateInputType
  }

  export type DocumentGroupByOutputType = {
    id: string
    category: string
    type: string
    subject: string
    content: string | null
    refNo: string | null
    status: string
    formData: string | null
    is_deleted: boolean
    createdAt: Date
    updatedAt: Date
    _count: DocumentCountAggregateOutputType | null
    _min: DocumentMinAggregateOutputType | null
    _max: DocumentMaxAggregateOutputType | null
  }

  type GetDocumentGroupByPayload<T extends DocumentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DocumentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DocumentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DocumentGroupByOutputType[P]>
            : GetScalarType<T[P], DocumentGroupByOutputType[P]>
        }
      >
    >


  export type DocumentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    category?: boolean
    type?: boolean
    subject?: boolean
    content?: boolean
    refNo?: boolean
    status?: boolean
    formData?: boolean
    is_deleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    category?: boolean
    type?: boolean
    subject?: boolean
    content?: boolean
    refNo?: boolean
    status?: boolean
    formData?: boolean
    is_deleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    category?: boolean
    type?: boolean
    subject?: boolean
    content?: boolean
    refNo?: boolean
    status?: boolean
    formData?: boolean
    is_deleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectScalar = {
    id?: boolean
    category?: boolean
    type?: boolean
    subject?: boolean
    content?: boolean
    refNo?: boolean
    status?: boolean
    formData?: boolean
    is_deleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DocumentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "category" | "type" | "subject" | "content" | "refNo" | "status" | "formData" | "is_deleted" | "createdAt" | "updatedAt", ExtArgs["result"]["document"]>

  export type $DocumentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Document"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      category: string
      type: string
      subject: string
      content: string | null
      refNo: string | null
      status: string
      formData: string | null
      is_deleted: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["document"]>
    composites: {}
  }

  type DocumentGetPayload<S extends boolean | null | undefined | DocumentDefaultArgs> = $Result.GetResult<Prisma.$DocumentPayload, S>

  type DocumentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DocumentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DocumentCountAggregateInputType | true
    }

  export interface DocumentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Document'], meta: { name: 'Document' } }
    /**
     * Find zero or one Document that matches the filter.
     * @param {DocumentFindUniqueArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DocumentFindUniqueArgs>(args: SelectSubset<T, DocumentFindUniqueArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Document that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DocumentFindUniqueOrThrowArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DocumentFindUniqueOrThrowArgs>(args: SelectSubset<T, DocumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Document that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindFirstArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DocumentFindFirstArgs>(args?: SelectSubset<T, DocumentFindFirstArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Document that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindFirstOrThrowArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DocumentFindFirstOrThrowArgs>(args?: SelectSubset<T, DocumentFindFirstOrThrowArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Documents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Documents
     * const documents = await prisma.document.findMany()
     * 
     * // Get first 10 Documents
     * const documents = await prisma.document.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const documentWithIdOnly = await prisma.document.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DocumentFindManyArgs>(args?: SelectSubset<T, DocumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Document.
     * @param {DocumentCreateArgs} args - Arguments to create a Document.
     * @example
     * // Create one Document
     * const Document = await prisma.document.create({
     *   data: {
     *     // ... data to create a Document
     *   }
     * })
     * 
     */
    create<T extends DocumentCreateArgs>(args: SelectSubset<T, DocumentCreateArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Documents.
     * @param {DocumentCreateManyArgs} args - Arguments to create many Documents.
     * @example
     * // Create many Documents
     * const document = await prisma.document.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DocumentCreateManyArgs>(args?: SelectSubset<T, DocumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Documents and returns the data saved in the database.
     * @param {DocumentCreateManyAndReturnArgs} args - Arguments to create many Documents.
     * @example
     * // Create many Documents
     * const document = await prisma.document.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Documents and only return the `id`
     * const documentWithIdOnly = await prisma.document.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DocumentCreateManyAndReturnArgs>(args?: SelectSubset<T, DocumentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Document.
     * @param {DocumentDeleteArgs} args - Arguments to delete one Document.
     * @example
     * // Delete one Document
     * const Document = await prisma.document.delete({
     *   where: {
     *     // ... filter to delete one Document
     *   }
     * })
     * 
     */
    delete<T extends DocumentDeleteArgs>(args: SelectSubset<T, DocumentDeleteArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Document.
     * @param {DocumentUpdateArgs} args - Arguments to update one Document.
     * @example
     * // Update one Document
     * const document = await prisma.document.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DocumentUpdateArgs>(args: SelectSubset<T, DocumentUpdateArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Documents.
     * @param {DocumentDeleteManyArgs} args - Arguments to filter Documents to delete.
     * @example
     * // Delete a few Documents
     * const { count } = await prisma.document.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DocumentDeleteManyArgs>(args?: SelectSubset<T, DocumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Documents
     * const document = await prisma.document.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DocumentUpdateManyArgs>(args: SelectSubset<T, DocumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Documents and returns the data updated in the database.
     * @param {DocumentUpdateManyAndReturnArgs} args - Arguments to update many Documents.
     * @example
     * // Update many Documents
     * const document = await prisma.document.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Documents and only return the `id`
     * const documentWithIdOnly = await prisma.document.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DocumentUpdateManyAndReturnArgs>(args: SelectSubset<T, DocumentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Document.
     * @param {DocumentUpsertArgs} args - Arguments to update or create a Document.
     * @example
     * // Update or create a Document
     * const document = await prisma.document.upsert({
     *   create: {
     *     // ... data to create a Document
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Document we want to update
     *   }
     * })
     */
    upsert<T extends DocumentUpsertArgs>(args: SelectSubset<T, DocumentUpsertArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentCountArgs} args - Arguments to filter Documents to count.
     * @example
     * // Count the number of Documents
     * const count = await prisma.document.count({
     *   where: {
     *     // ... the filter for the Documents we want to count
     *   }
     * })
    **/
    count<T extends DocumentCountArgs>(
      args?: Subset<T, DocumentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DocumentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Document.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DocumentAggregateArgs>(args: Subset<T, DocumentAggregateArgs>): Prisma.PrismaPromise<GetDocumentAggregateType<T>>

    /**
     * Group by Document.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DocumentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DocumentGroupByArgs['orderBy'] }
        : { orderBy?: DocumentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Document model
   */
  readonly fields: DocumentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Document.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DocumentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Document model
   */
  interface DocumentFieldRefs {
    readonly id: FieldRef<"Document", 'String'>
    readonly category: FieldRef<"Document", 'String'>
    readonly type: FieldRef<"Document", 'String'>
    readonly subject: FieldRef<"Document", 'String'>
    readonly content: FieldRef<"Document", 'String'>
    readonly refNo: FieldRef<"Document", 'String'>
    readonly status: FieldRef<"Document", 'String'>
    readonly formData: FieldRef<"Document", 'String'>
    readonly is_deleted: FieldRef<"Document", 'Boolean'>
    readonly createdAt: FieldRef<"Document", 'DateTime'>
    readonly updatedAt: FieldRef<"Document", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Document findUnique
   */
  export type DocumentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document findUniqueOrThrow
   */
  export type DocumentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document findFirst
   */
  export type DocumentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document findFirstOrThrow
   */
  export type DocumentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document findMany
   */
  export type DocumentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Filter, which Documents to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document create
   */
  export type DocumentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * The data needed to create a Document.
     */
    data: XOR<DocumentCreateInput, DocumentUncheckedCreateInput>
  }

  /**
   * Document createMany
   */
  export type DocumentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Documents.
     */
    data: DocumentCreateManyInput | DocumentCreateManyInput[]
  }

  /**
   * Document createManyAndReturn
   */
  export type DocumentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * The data used to create many Documents.
     */
    data: DocumentCreateManyInput | DocumentCreateManyInput[]
  }

  /**
   * Document update
   */
  export type DocumentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * The data needed to update a Document.
     */
    data: XOR<DocumentUpdateInput, DocumentUncheckedUpdateInput>
    /**
     * Choose, which Document to update.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document updateMany
   */
  export type DocumentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Documents.
     */
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyInput>
    /**
     * Filter which Documents to update
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to update.
     */
    limit?: number
  }

  /**
   * Document updateManyAndReturn
   */
  export type DocumentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * The data used to update Documents.
     */
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyInput>
    /**
     * Filter which Documents to update
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to update.
     */
    limit?: number
  }

  /**
   * Document upsert
   */
  export type DocumentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * The filter to search for the Document to update in case it exists.
     */
    where: DocumentWhereUniqueInput
    /**
     * In case the Document found by the `where` argument doesn't exist, create a new Document with this data.
     */
    create: XOR<DocumentCreateInput, DocumentUncheckedCreateInput>
    /**
     * In case the Document was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DocumentUpdateInput, DocumentUncheckedUpdateInput>
  }

  /**
   * Document delete
   */
  export type DocumentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Filter which Document to delete.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document deleteMany
   */
  export type DocumentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Documents to delete
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to delete.
     */
    limit?: number
  }

  /**
   * Document without action
   */
  export type DocumentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
  }


  /**
   * Model BranchSurvey
   */

  export type AggregateBranchSurvey = {
    _count: BranchSurveyCountAggregateOutputType | null
    _avg: BranchSurveyAvgAggregateOutputType | null
    _sum: BranchSurveySumAggregateOutputType | null
    _min: BranchSurveyMinAggregateOutputType | null
    _max: BranchSurveyMaxAggregateOutputType | null
  }

  export type BranchSurveyAvgAggregateOutputType = {
    id: number | null
  }

  export type BranchSurveySumAggregateOutputType = {
    id: number | null
  }

  export type BranchSurveyMinAggregateOutputType = {
    id: number | null
    refNo: string | null
    region: string | null
    applicationType: string | null
    date: string | null
    branch_name: string | null
    formData: string | null
    is_deleted: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BranchSurveyMaxAggregateOutputType = {
    id: number | null
    refNo: string | null
    region: string | null
    applicationType: string | null
    date: string | null
    branch_name: string | null
    formData: string | null
    is_deleted: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BranchSurveyCountAggregateOutputType = {
    id: number
    refNo: number
    region: number
    applicationType: number
    date: number
    branch_name: number
    formData: number
    is_deleted: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BranchSurveyAvgAggregateInputType = {
    id?: true
  }

  export type BranchSurveySumAggregateInputType = {
    id?: true
  }

  export type BranchSurveyMinAggregateInputType = {
    id?: true
    refNo?: true
    region?: true
    applicationType?: true
    date?: true
    branch_name?: true
    formData?: true
    is_deleted?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BranchSurveyMaxAggregateInputType = {
    id?: true
    refNo?: true
    region?: true
    applicationType?: true
    date?: true
    branch_name?: true
    formData?: true
    is_deleted?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BranchSurveyCountAggregateInputType = {
    id?: true
    refNo?: true
    region?: true
    applicationType?: true
    date?: true
    branch_name?: true
    formData?: true
    is_deleted?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BranchSurveyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BranchSurvey to aggregate.
     */
    where?: BranchSurveyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BranchSurveys to fetch.
     */
    orderBy?: BranchSurveyOrderByWithRelationInput | BranchSurveyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BranchSurveyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BranchSurveys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BranchSurveys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BranchSurveys
    **/
    _count?: true | BranchSurveyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BranchSurveyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BranchSurveySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BranchSurveyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BranchSurveyMaxAggregateInputType
  }

  export type GetBranchSurveyAggregateType<T extends BranchSurveyAggregateArgs> = {
        [P in keyof T & keyof AggregateBranchSurvey]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBranchSurvey[P]>
      : GetScalarType<T[P], AggregateBranchSurvey[P]>
  }




  export type BranchSurveyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BranchSurveyWhereInput
    orderBy?: BranchSurveyOrderByWithAggregationInput | BranchSurveyOrderByWithAggregationInput[]
    by: BranchSurveyScalarFieldEnum[] | BranchSurveyScalarFieldEnum
    having?: BranchSurveyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BranchSurveyCountAggregateInputType | true
    _avg?: BranchSurveyAvgAggregateInputType
    _sum?: BranchSurveySumAggregateInputType
    _min?: BranchSurveyMinAggregateInputType
    _max?: BranchSurveyMaxAggregateInputType
  }

  export type BranchSurveyGroupByOutputType = {
    id: number
    refNo: string | null
    region: string | null
    applicationType: string | null
    date: string | null
    branch_name: string | null
    formData: string | null
    is_deleted: boolean
    createdAt: Date
    updatedAt: Date
    _count: BranchSurveyCountAggregateOutputType | null
    _avg: BranchSurveyAvgAggregateOutputType | null
    _sum: BranchSurveySumAggregateOutputType | null
    _min: BranchSurveyMinAggregateOutputType | null
    _max: BranchSurveyMaxAggregateOutputType | null
  }

  type GetBranchSurveyGroupByPayload<T extends BranchSurveyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BranchSurveyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BranchSurveyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BranchSurveyGroupByOutputType[P]>
            : GetScalarType<T[P], BranchSurveyGroupByOutputType[P]>
        }
      >
    >


  export type BranchSurveySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    refNo?: boolean
    region?: boolean
    applicationType?: boolean
    date?: boolean
    branch_name?: boolean
    formData?: boolean
    is_deleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["branchSurvey"]>

  export type BranchSurveySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    refNo?: boolean
    region?: boolean
    applicationType?: boolean
    date?: boolean
    branch_name?: boolean
    formData?: boolean
    is_deleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["branchSurvey"]>

  export type BranchSurveySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    refNo?: boolean
    region?: boolean
    applicationType?: boolean
    date?: boolean
    branch_name?: boolean
    formData?: boolean
    is_deleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["branchSurvey"]>

  export type BranchSurveySelectScalar = {
    id?: boolean
    refNo?: boolean
    region?: boolean
    applicationType?: boolean
    date?: boolean
    branch_name?: boolean
    formData?: boolean
    is_deleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BranchSurveyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "refNo" | "region" | "applicationType" | "date" | "branch_name" | "formData" | "is_deleted" | "createdAt" | "updatedAt", ExtArgs["result"]["branchSurvey"]>

  export type $BranchSurveyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BranchSurvey"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      refNo: string | null
      region: string | null
      applicationType: string | null
      date: string | null
      branch_name: string | null
      formData: string | null
      is_deleted: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["branchSurvey"]>
    composites: {}
  }

  type BranchSurveyGetPayload<S extends boolean | null | undefined | BranchSurveyDefaultArgs> = $Result.GetResult<Prisma.$BranchSurveyPayload, S>

  type BranchSurveyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BranchSurveyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BranchSurveyCountAggregateInputType | true
    }

  export interface BranchSurveyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BranchSurvey'], meta: { name: 'BranchSurvey' } }
    /**
     * Find zero or one BranchSurvey that matches the filter.
     * @param {BranchSurveyFindUniqueArgs} args - Arguments to find a BranchSurvey
     * @example
     * // Get one BranchSurvey
     * const branchSurvey = await prisma.branchSurvey.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BranchSurveyFindUniqueArgs>(args: SelectSubset<T, BranchSurveyFindUniqueArgs<ExtArgs>>): Prisma__BranchSurveyClient<$Result.GetResult<Prisma.$BranchSurveyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BranchSurvey that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BranchSurveyFindUniqueOrThrowArgs} args - Arguments to find a BranchSurvey
     * @example
     * // Get one BranchSurvey
     * const branchSurvey = await prisma.branchSurvey.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BranchSurveyFindUniqueOrThrowArgs>(args: SelectSubset<T, BranchSurveyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BranchSurveyClient<$Result.GetResult<Prisma.$BranchSurveyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BranchSurvey that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchSurveyFindFirstArgs} args - Arguments to find a BranchSurvey
     * @example
     * // Get one BranchSurvey
     * const branchSurvey = await prisma.branchSurvey.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BranchSurveyFindFirstArgs>(args?: SelectSubset<T, BranchSurveyFindFirstArgs<ExtArgs>>): Prisma__BranchSurveyClient<$Result.GetResult<Prisma.$BranchSurveyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BranchSurvey that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchSurveyFindFirstOrThrowArgs} args - Arguments to find a BranchSurvey
     * @example
     * // Get one BranchSurvey
     * const branchSurvey = await prisma.branchSurvey.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BranchSurveyFindFirstOrThrowArgs>(args?: SelectSubset<T, BranchSurveyFindFirstOrThrowArgs<ExtArgs>>): Prisma__BranchSurveyClient<$Result.GetResult<Prisma.$BranchSurveyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BranchSurveys that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchSurveyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BranchSurveys
     * const branchSurveys = await prisma.branchSurvey.findMany()
     * 
     * // Get first 10 BranchSurveys
     * const branchSurveys = await prisma.branchSurvey.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const branchSurveyWithIdOnly = await prisma.branchSurvey.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BranchSurveyFindManyArgs>(args?: SelectSubset<T, BranchSurveyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BranchSurveyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BranchSurvey.
     * @param {BranchSurveyCreateArgs} args - Arguments to create a BranchSurvey.
     * @example
     * // Create one BranchSurvey
     * const BranchSurvey = await prisma.branchSurvey.create({
     *   data: {
     *     // ... data to create a BranchSurvey
     *   }
     * })
     * 
     */
    create<T extends BranchSurveyCreateArgs>(args: SelectSubset<T, BranchSurveyCreateArgs<ExtArgs>>): Prisma__BranchSurveyClient<$Result.GetResult<Prisma.$BranchSurveyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BranchSurveys.
     * @param {BranchSurveyCreateManyArgs} args - Arguments to create many BranchSurveys.
     * @example
     * // Create many BranchSurveys
     * const branchSurvey = await prisma.branchSurvey.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BranchSurveyCreateManyArgs>(args?: SelectSubset<T, BranchSurveyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BranchSurveys and returns the data saved in the database.
     * @param {BranchSurveyCreateManyAndReturnArgs} args - Arguments to create many BranchSurveys.
     * @example
     * // Create many BranchSurveys
     * const branchSurvey = await prisma.branchSurvey.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BranchSurveys and only return the `id`
     * const branchSurveyWithIdOnly = await prisma.branchSurvey.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BranchSurveyCreateManyAndReturnArgs>(args?: SelectSubset<T, BranchSurveyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BranchSurveyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BranchSurvey.
     * @param {BranchSurveyDeleteArgs} args - Arguments to delete one BranchSurvey.
     * @example
     * // Delete one BranchSurvey
     * const BranchSurvey = await prisma.branchSurvey.delete({
     *   where: {
     *     // ... filter to delete one BranchSurvey
     *   }
     * })
     * 
     */
    delete<T extends BranchSurveyDeleteArgs>(args: SelectSubset<T, BranchSurveyDeleteArgs<ExtArgs>>): Prisma__BranchSurveyClient<$Result.GetResult<Prisma.$BranchSurveyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BranchSurvey.
     * @param {BranchSurveyUpdateArgs} args - Arguments to update one BranchSurvey.
     * @example
     * // Update one BranchSurvey
     * const branchSurvey = await prisma.branchSurvey.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BranchSurveyUpdateArgs>(args: SelectSubset<T, BranchSurveyUpdateArgs<ExtArgs>>): Prisma__BranchSurveyClient<$Result.GetResult<Prisma.$BranchSurveyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BranchSurveys.
     * @param {BranchSurveyDeleteManyArgs} args - Arguments to filter BranchSurveys to delete.
     * @example
     * // Delete a few BranchSurveys
     * const { count } = await prisma.branchSurvey.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BranchSurveyDeleteManyArgs>(args?: SelectSubset<T, BranchSurveyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BranchSurveys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchSurveyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BranchSurveys
     * const branchSurvey = await prisma.branchSurvey.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BranchSurveyUpdateManyArgs>(args: SelectSubset<T, BranchSurveyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BranchSurveys and returns the data updated in the database.
     * @param {BranchSurveyUpdateManyAndReturnArgs} args - Arguments to update many BranchSurveys.
     * @example
     * // Update many BranchSurveys
     * const branchSurvey = await prisma.branchSurvey.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BranchSurveys and only return the `id`
     * const branchSurveyWithIdOnly = await prisma.branchSurvey.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BranchSurveyUpdateManyAndReturnArgs>(args: SelectSubset<T, BranchSurveyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BranchSurveyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BranchSurvey.
     * @param {BranchSurveyUpsertArgs} args - Arguments to update or create a BranchSurvey.
     * @example
     * // Update or create a BranchSurvey
     * const branchSurvey = await prisma.branchSurvey.upsert({
     *   create: {
     *     // ... data to create a BranchSurvey
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BranchSurvey we want to update
     *   }
     * })
     */
    upsert<T extends BranchSurveyUpsertArgs>(args: SelectSubset<T, BranchSurveyUpsertArgs<ExtArgs>>): Prisma__BranchSurveyClient<$Result.GetResult<Prisma.$BranchSurveyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BranchSurveys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchSurveyCountArgs} args - Arguments to filter BranchSurveys to count.
     * @example
     * // Count the number of BranchSurveys
     * const count = await prisma.branchSurvey.count({
     *   where: {
     *     // ... the filter for the BranchSurveys we want to count
     *   }
     * })
    **/
    count<T extends BranchSurveyCountArgs>(
      args?: Subset<T, BranchSurveyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BranchSurveyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BranchSurvey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchSurveyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BranchSurveyAggregateArgs>(args: Subset<T, BranchSurveyAggregateArgs>): Prisma.PrismaPromise<GetBranchSurveyAggregateType<T>>

    /**
     * Group by BranchSurvey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchSurveyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BranchSurveyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BranchSurveyGroupByArgs['orderBy'] }
        : { orderBy?: BranchSurveyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BranchSurveyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBranchSurveyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BranchSurvey model
   */
  readonly fields: BranchSurveyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BranchSurvey.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BranchSurveyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BranchSurvey model
   */
  interface BranchSurveyFieldRefs {
    readonly id: FieldRef<"BranchSurvey", 'Int'>
    readonly refNo: FieldRef<"BranchSurvey", 'String'>
    readonly region: FieldRef<"BranchSurvey", 'String'>
    readonly applicationType: FieldRef<"BranchSurvey", 'String'>
    readonly date: FieldRef<"BranchSurvey", 'String'>
    readonly branch_name: FieldRef<"BranchSurvey", 'String'>
    readonly formData: FieldRef<"BranchSurvey", 'String'>
    readonly is_deleted: FieldRef<"BranchSurvey", 'Boolean'>
    readonly createdAt: FieldRef<"BranchSurvey", 'DateTime'>
    readonly updatedAt: FieldRef<"BranchSurvey", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BranchSurvey findUnique
   */
  export type BranchSurveyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchSurvey
     */
    select?: BranchSurveySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BranchSurvey
     */
    omit?: BranchSurveyOmit<ExtArgs> | null
    /**
     * Filter, which BranchSurvey to fetch.
     */
    where: BranchSurveyWhereUniqueInput
  }

  /**
   * BranchSurvey findUniqueOrThrow
   */
  export type BranchSurveyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchSurvey
     */
    select?: BranchSurveySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BranchSurvey
     */
    omit?: BranchSurveyOmit<ExtArgs> | null
    /**
     * Filter, which BranchSurvey to fetch.
     */
    where: BranchSurveyWhereUniqueInput
  }

  /**
   * BranchSurvey findFirst
   */
  export type BranchSurveyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchSurvey
     */
    select?: BranchSurveySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BranchSurvey
     */
    omit?: BranchSurveyOmit<ExtArgs> | null
    /**
     * Filter, which BranchSurvey to fetch.
     */
    where?: BranchSurveyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BranchSurveys to fetch.
     */
    orderBy?: BranchSurveyOrderByWithRelationInput | BranchSurveyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BranchSurveys.
     */
    cursor?: BranchSurveyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BranchSurveys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BranchSurveys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BranchSurveys.
     */
    distinct?: BranchSurveyScalarFieldEnum | BranchSurveyScalarFieldEnum[]
  }

  /**
   * BranchSurvey findFirstOrThrow
   */
  export type BranchSurveyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchSurvey
     */
    select?: BranchSurveySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BranchSurvey
     */
    omit?: BranchSurveyOmit<ExtArgs> | null
    /**
     * Filter, which BranchSurvey to fetch.
     */
    where?: BranchSurveyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BranchSurveys to fetch.
     */
    orderBy?: BranchSurveyOrderByWithRelationInput | BranchSurveyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BranchSurveys.
     */
    cursor?: BranchSurveyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BranchSurveys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BranchSurveys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BranchSurveys.
     */
    distinct?: BranchSurveyScalarFieldEnum | BranchSurveyScalarFieldEnum[]
  }

  /**
   * BranchSurvey findMany
   */
  export type BranchSurveyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchSurvey
     */
    select?: BranchSurveySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BranchSurvey
     */
    omit?: BranchSurveyOmit<ExtArgs> | null
    /**
     * Filter, which BranchSurveys to fetch.
     */
    where?: BranchSurveyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BranchSurveys to fetch.
     */
    orderBy?: BranchSurveyOrderByWithRelationInput | BranchSurveyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BranchSurveys.
     */
    cursor?: BranchSurveyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BranchSurveys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BranchSurveys.
     */
    skip?: number
    distinct?: BranchSurveyScalarFieldEnum | BranchSurveyScalarFieldEnum[]
  }

  /**
   * BranchSurvey create
   */
  export type BranchSurveyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchSurvey
     */
    select?: BranchSurveySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BranchSurvey
     */
    omit?: BranchSurveyOmit<ExtArgs> | null
    /**
     * The data needed to create a BranchSurvey.
     */
    data: XOR<BranchSurveyCreateInput, BranchSurveyUncheckedCreateInput>
  }

  /**
   * BranchSurvey createMany
   */
  export type BranchSurveyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BranchSurveys.
     */
    data: BranchSurveyCreateManyInput | BranchSurveyCreateManyInput[]
  }

  /**
   * BranchSurvey createManyAndReturn
   */
  export type BranchSurveyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchSurvey
     */
    select?: BranchSurveySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BranchSurvey
     */
    omit?: BranchSurveyOmit<ExtArgs> | null
    /**
     * The data used to create many BranchSurveys.
     */
    data: BranchSurveyCreateManyInput | BranchSurveyCreateManyInput[]
  }

  /**
   * BranchSurvey update
   */
  export type BranchSurveyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchSurvey
     */
    select?: BranchSurveySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BranchSurvey
     */
    omit?: BranchSurveyOmit<ExtArgs> | null
    /**
     * The data needed to update a BranchSurvey.
     */
    data: XOR<BranchSurveyUpdateInput, BranchSurveyUncheckedUpdateInput>
    /**
     * Choose, which BranchSurvey to update.
     */
    where: BranchSurveyWhereUniqueInput
  }

  /**
   * BranchSurvey updateMany
   */
  export type BranchSurveyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BranchSurveys.
     */
    data: XOR<BranchSurveyUpdateManyMutationInput, BranchSurveyUncheckedUpdateManyInput>
    /**
     * Filter which BranchSurveys to update
     */
    where?: BranchSurveyWhereInput
    /**
     * Limit how many BranchSurveys to update.
     */
    limit?: number
  }

  /**
   * BranchSurvey updateManyAndReturn
   */
  export type BranchSurveyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchSurvey
     */
    select?: BranchSurveySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BranchSurvey
     */
    omit?: BranchSurveyOmit<ExtArgs> | null
    /**
     * The data used to update BranchSurveys.
     */
    data: XOR<BranchSurveyUpdateManyMutationInput, BranchSurveyUncheckedUpdateManyInput>
    /**
     * Filter which BranchSurveys to update
     */
    where?: BranchSurveyWhereInput
    /**
     * Limit how many BranchSurveys to update.
     */
    limit?: number
  }

  /**
   * BranchSurvey upsert
   */
  export type BranchSurveyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchSurvey
     */
    select?: BranchSurveySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BranchSurvey
     */
    omit?: BranchSurveyOmit<ExtArgs> | null
    /**
     * The filter to search for the BranchSurvey to update in case it exists.
     */
    where: BranchSurveyWhereUniqueInput
    /**
     * In case the BranchSurvey found by the `where` argument doesn't exist, create a new BranchSurvey with this data.
     */
    create: XOR<BranchSurveyCreateInput, BranchSurveyUncheckedCreateInput>
    /**
     * In case the BranchSurvey was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BranchSurveyUpdateInput, BranchSurveyUncheckedUpdateInput>
  }

  /**
   * BranchSurvey delete
   */
  export type BranchSurveyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchSurvey
     */
    select?: BranchSurveySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BranchSurvey
     */
    omit?: BranchSurveyOmit<ExtArgs> | null
    /**
     * Filter which BranchSurvey to delete.
     */
    where: BranchSurveyWhereUniqueInput
  }

  /**
   * BranchSurvey deleteMany
   */
  export type BranchSurveyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BranchSurveys to delete
     */
    where?: BranchSurveyWhereInput
    /**
     * Limit how many BranchSurveys to delete.
     */
    limit?: number
  }

  /**
   * BranchSurvey without action
   */
  export type BranchSurveyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchSurvey
     */
    select?: BranchSurveySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BranchSurvey
     */
    omit?: BranchSurveyOmit<ExtArgs> | null
  }


  /**
   * Model BankConfig
   */

  export type AggregateBankConfig = {
    _count: BankConfigCountAggregateOutputType | null
    _avg: BankConfigAvgAggregateOutputType | null
    _sum: BankConfigSumAggregateOutputType | null
    _min: BankConfigMinAggregateOutputType | null
    _max: BankConfigMaxAggregateOutputType | null
  }

  export type BankConfigAvgAggregateOutputType = {
    id: number | null
  }

  export type BankConfigSumAggregateOutputType = {
    id: number | null
  }

  export type BankConfigMinAggregateOutputType = {
    id: number | null
    name_english: string | null
    name_hindi: string | null
    name_local: string | null
    dept_english: string | null
    dept_hindi: string | null
    dept_local: string | null
  }

  export type BankConfigMaxAggregateOutputType = {
    id: number | null
    name_english: string | null
    name_hindi: string | null
    name_local: string | null
    dept_english: string | null
    dept_hindi: string | null
    dept_local: string | null
  }

  export type BankConfigCountAggregateOutputType = {
    id: number
    name_english: number
    name_hindi: number
    name_local: number
    dept_english: number
    dept_hindi: number
    dept_local: number
    _all: number
  }


  export type BankConfigAvgAggregateInputType = {
    id?: true
  }

  export type BankConfigSumAggregateInputType = {
    id?: true
  }

  export type BankConfigMinAggregateInputType = {
    id?: true
    name_english?: true
    name_hindi?: true
    name_local?: true
    dept_english?: true
    dept_hindi?: true
    dept_local?: true
  }

  export type BankConfigMaxAggregateInputType = {
    id?: true
    name_english?: true
    name_hindi?: true
    name_local?: true
    dept_english?: true
    dept_hindi?: true
    dept_local?: true
  }

  export type BankConfigCountAggregateInputType = {
    id?: true
    name_english?: true
    name_hindi?: true
    name_local?: true
    dept_english?: true
    dept_hindi?: true
    dept_local?: true
    _all?: true
  }

  export type BankConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BankConfig to aggregate.
     */
    where?: BankConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BankConfigs to fetch.
     */
    orderBy?: BankConfigOrderByWithRelationInput | BankConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BankConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BankConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BankConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BankConfigs
    **/
    _count?: true | BankConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BankConfigAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BankConfigSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BankConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BankConfigMaxAggregateInputType
  }

  export type GetBankConfigAggregateType<T extends BankConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateBankConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBankConfig[P]>
      : GetScalarType<T[P], AggregateBankConfig[P]>
  }




  export type BankConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BankConfigWhereInput
    orderBy?: BankConfigOrderByWithAggregationInput | BankConfigOrderByWithAggregationInput[]
    by: BankConfigScalarFieldEnum[] | BankConfigScalarFieldEnum
    having?: BankConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BankConfigCountAggregateInputType | true
    _avg?: BankConfigAvgAggregateInputType
    _sum?: BankConfigSumAggregateInputType
    _min?: BankConfigMinAggregateInputType
    _max?: BankConfigMaxAggregateInputType
  }

  export type BankConfigGroupByOutputType = {
    id: number
    name_english: string | null
    name_hindi: string | null
    name_local: string | null
    dept_english: string | null
    dept_hindi: string | null
    dept_local: string | null
    _count: BankConfigCountAggregateOutputType | null
    _avg: BankConfigAvgAggregateOutputType | null
    _sum: BankConfigSumAggregateOutputType | null
    _min: BankConfigMinAggregateOutputType | null
    _max: BankConfigMaxAggregateOutputType | null
  }

  type GetBankConfigGroupByPayload<T extends BankConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BankConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BankConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BankConfigGroupByOutputType[P]>
            : GetScalarType<T[P], BankConfigGroupByOutputType[P]>
        }
      >
    >


  export type BankConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name_english?: boolean
    name_hindi?: boolean
    name_local?: boolean
    dept_english?: boolean
    dept_hindi?: boolean
    dept_local?: boolean
  }, ExtArgs["result"]["bankConfig"]>

  export type BankConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name_english?: boolean
    name_hindi?: boolean
    name_local?: boolean
    dept_english?: boolean
    dept_hindi?: boolean
    dept_local?: boolean
  }, ExtArgs["result"]["bankConfig"]>

  export type BankConfigSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name_english?: boolean
    name_hindi?: boolean
    name_local?: boolean
    dept_english?: boolean
    dept_hindi?: boolean
    dept_local?: boolean
  }, ExtArgs["result"]["bankConfig"]>

  export type BankConfigSelectScalar = {
    id?: boolean
    name_english?: boolean
    name_hindi?: boolean
    name_local?: boolean
    dept_english?: boolean
    dept_hindi?: boolean
    dept_local?: boolean
  }

  export type BankConfigOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name_english" | "name_hindi" | "name_local" | "dept_english" | "dept_hindi" | "dept_local", ExtArgs["result"]["bankConfig"]>

  export type $BankConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BankConfig"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name_english: string | null
      name_hindi: string | null
      name_local: string | null
      dept_english: string | null
      dept_hindi: string | null
      dept_local: string | null
    }, ExtArgs["result"]["bankConfig"]>
    composites: {}
  }

  type BankConfigGetPayload<S extends boolean | null | undefined | BankConfigDefaultArgs> = $Result.GetResult<Prisma.$BankConfigPayload, S>

  type BankConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BankConfigFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BankConfigCountAggregateInputType | true
    }

  export interface BankConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BankConfig'], meta: { name: 'BankConfig' } }
    /**
     * Find zero or one BankConfig that matches the filter.
     * @param {BankConfigFindUniqueArgs} args - Arguments to find a BankConfig
     * @example
     * // Get one BankConfig
     * const bankConfig = await prisma.bankConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BankConfigFindUniqueArgs>(args: SelectSubset<T, BankConfigFindUniqueArgs<ExtArgs>>): Prisma__BankConfigClient<$Result.GetResult<Prisma.$BankConfigPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BankConfig that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BankConfigFindUniqueOrThrowArgs} args - Arguments to find a BankConfig
     * @example
     * // Get one BankConfig
     * const bankConfig = await prisma.bankConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BankConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, BankConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BankConfigClient<$Result.GetResult<Prisma.$BankConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BankConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankConfigFindFirstArgs} args - Arguments to find a BankConfig
     * @example
     * // Get one BankConfig
     * const bankConfig = await prisma.bankConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BankConfigFindFirstArgs>(args?: SelectSubset<T, BankConfigFindFirstArgs<ExtArgs>>): Prisma__BankConfigClient<$Result.GetResult<Prisma.$BankConfigPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BankConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankConfigFindFirstOrThrowArgs} args - Arguments to find a BankConfig
     * @example
     * // Get one BankConfig
     * const bankConfig = await prisma.bankConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BankConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, BankConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__BankConfigClient<$Result.GetResult<Prisma.$BankConfigPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BankConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BankConfigs
     * const bankConfigs = await prisma.bankConfig.findMany()
     * 
     * // Get first 10 BankConfigs
     * const bankConfigs = await prisma.bankConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bankConfigWithIdOnly = await prisma.bankConfig.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BankConfigFindManyArgs>(args?: SelectSubset<T, BankConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BankConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BankConfig.
     * @param {BankConfigCreateArgs} args - Arguments to create a BankConfig.
     * @example
     * // Create one BankConfig
     * const BankConfig = await prisma.bankConfig.create({
     *   data: {
     *     // ... data to create a BankConfig
     *   }
     * })
     * 
     */
    create<T extends BankConfigCreateArgs>(args: SelectSubset<T, BankConfigCreateArgs<ExtArgs>>): Prisma__BankConfigClient<$Result.GetResult<Prisma.$BankConfigPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BankConfigs.
     * @param {BankConfigCreateManyArgs} args - Arguments to create many BankConfigs.
     * @example
     * // Create many BankConfigs
     * const bankConfig = await prisma.bankConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BankConfigCreateManyArgs>(args?: SelectSubset<T, BankConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BankConfigs and returns the data saved in the database.
     * @param {BankConfigCreateManyAndReturnArgs} args - Arguments to create many BankConfigs.
     * @example
     * // Create many BankConfigs
     * const bankConfig = await prisma.bankConfig.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BankConfigs and only return the `id`
     * const bankConfigWithIdOnly = await prisma.bankConfig.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BankConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, BankConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BankConfigPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BankConfig.
     * @param {BankConfigDeleteArgs} args - Arguments to delete one BankConfig.
     * @example
     * // Delete one BankConfig
     * const BankConfig = await prisma.bankConfig.delete({
     *   where: {
     *     // ... filter to delete one BankConfig
     *   }
     * })
     * 
     */
    delete<T extends BankConfigDeleteArgs>(args: SelectSubset<T, BankConfigDeleteArgs<ExtArgs>>): Prisma__BankConfigClient<$Result.GetResult<Prisma.$BankConfigPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BankConfig.
     * @param {BankConfigUpdateArgs} args - Arguments to update one BankConfig.
     * @example
     * // Update one BankConfig
     * const bankConfig = await prisma.bankConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BankConfigUpdateArgs>(args: SelectSubset<T, BankConfigUpdateArgs<ExtArgs>>): Prisma__BankConfigClient<$Result.GetResult<Prisma.$BankConfigPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BankConfigs.
     * @param {BankConfigDeleteManyArgs} args - Arguments to filter BankConfigs to delete.
     * @example
     * // Delete a few BankConfigs
     * const { count } = await prisma.bankConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BankConfigDeleteManyArgs>(args?: SelectSubset<T, BankConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BankConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BankConfigs
     * const bankConfig = await prisma.bankConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BankConfigUpdateManyArgs>(args: SelectSubset<T, BankConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BankConfigs and returns the data updated in the database.
     * @param {BankConfigUpdateManyAndReturnArgs} args - Arguments to update many BankConfigs.
     * @example
     * // Update many BankConfigs
     * const bankConfig = await prisma.bankConfig.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BankConfigs and only return the `id`
     * const bankConfigWithIdOnly = await prisma.bankConfig.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BankConfigUpdateManyAndReturnArgs>(args: SelectSubset<T, BankConfigUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BankConfigPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BankConfig.
     * @param {BankConfigUpsertArgs} args - Arguments to update or create a BankConfig.
     * @example
     * // Update or create a BankConfig
     * const bankConfig = await prisma.bankConfig.upsert({
     *   create: {
     *     // ... data to create a BankConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BankConfig we want to update
     *   }
     * })
     */
    upsert<T extends BankConfigUpsertArgs>(args: SelectSubset<T, BankConfigUpsertArgs<ExtArgs>>): Prisma__BankConfigClient<$Result.GetResult<Prisma.$BankConfigPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BankConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankConfigCountArgs} args - Arguments to filter BankConfigs to count.
     * @example
     * // Count the number of BankConfigs
     * const count = await prisma.bankConfig.count({
     *   where: {
     *     // ... the filter for the BankConfigs we want to count
     *   }
     * })
    **/
    count<T extends BankConfigCountArgs>(
      args?: Subset<T, BankConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BankConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BankConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BankConfigAggregateArgs>(args: Subset<T, BankConfigAggregateArgs>): Prisma.PrismaPromise<GetBankConfigAggregateType<T>>

    /**
     * Group by BankConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankConfigGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BankConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BankConfigGroupByArgs['orderBy'] }
        : { orderBy?: BankConfigGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BankConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBankConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BankConfig model
   */
  readonly fields: BankConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BankConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BankConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BankConfig model
   */
  interface BankConfigFieldRefs {
    readonly id: FieldRef<"BankConfig", 'Int'>
    readonly name_english: FieldRef<"BankConfig", 'String'>
    readonly name_hindi: FieldRef<"BankConfig", 'String'>
    readonly name_local: FieldRef<"BankConfig", 'String'>
    readonly dept_english: FieldRef<"BankConfig", 'String'>
    readonly dept_hindi: FieldRef<"BankConfig", 'String'>
    readonly dept_local: FieldRef<"BankConfig", 'String'>
  }
    

  // Custom InputTypes
  /**
   * BankConfig findUnique
   */
  export type BankConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankConfig
     */
    select?: BankConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankConfig
     */
    omit?: BankConfigOmit<ExtArgs> | null
    /**
     * Filter, which BankConfig to fetch.
     */
    where: BankConfigWhereUniqueInput
  }

  /**
   * BankConfig findUniqueOrThrow
   */
  export type BankConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankConfig
     */
    select?: BankConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankConfig
     */
    omit?: BankConfigOmit<ExtArgs> | null
    /**
     * Filter, which BankConfig to fetch.
     */
    where: BankConfigWhereUniqueInput
  }

  /**
   * BankConfig findFirst
   */
  export type BankConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankConfig
     */
    select?: BankConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankConfig
     */
    omit?: BankConfigOmit<ExtArgs> | null
    /**
     * Filter, which BankConfig to fetch.
     */
    where?: BankConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BankConfigs to fetch.
     */
    orderBy?: BankConfigOrderByWithRelationInput | BankConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BankConfigs.
     */
    cursor?: BankConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BankConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BankConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BankConfigs.
     */
    distinct?: BankConfigScalarFieldEnum | BankConfigScalarFieldEnum[]
  }

  /**
   * BankConfig findFirstOrThrow
   */
  export type BankConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankConfig
     */
    select?: BankConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankConfig
     */
    omit?: BankConfigOmit<ExtArgs> | null
    /**
     * Filter, which BankConfig to fetch.
     */
    where?: BankConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BankConfigs to fetch.
     */
    orderBy?: BankConfigOrderByWithRelationInput | BankConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BankConfigs.
     */
    cursor?: BankConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BankConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BankConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BankConfigs.
     */
    distinct?: BankConfigScalarFieldEnum | BankConfigScalarFieldEnum[]
  }

  /**
   * BankConfig findMany
   */
  export type BankConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankConfig
     */
    select?: BankConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankConfig
     */
    omit?: BankConfigOmit<ExtArgs> | null
    /**
     * Filter, which BankConfigs to fetch.
     */
    where?: BankConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BankConfigs to fetch.
     */
    orderBy?: BankConfigOrderByWithRelationInput | BankConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BankConfigs.
     */
    cursor?: BankConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BankConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BankConfigs.
     */
    skip?: number
    distinct?: BankConfigScalarFieldEnum | BankConfigScalarFieldEnum[]
  }

  /**
   * BankConfig create
   */
  export type BankConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankConfig
     */
    select?: BankConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankConfig
     */
    omit?: BankConfigOmit<ExtArgs> | null
    /**
     * The data needed to create a BankConfig.
     */
    data?: XOR<BankConfigCreateInput, BankConfigUncheckedCreateInput>
  }

  /**
   * BankConfig createMany
   */
  export type BankConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BankConfigs.
     */
    data: BankConfigCreateManyInput | BankConfigCreateManyInput[]
  }

  /**
   * BankConfig createManyAndReturn
   */
  export type BankConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankConfig
     */
    select?: BankConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BankConfig
     */
    omit?: BankConfigOmit<ExtArgs> | null
    /**
     * The data used to create many BankConfigs.
     */
    data: BankConfigCreateManyInput | BankConfigCreateManyInput[]
  }

  /**
   * BankConfig update
   */
  export type BankConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankConfig
     */
    select?: BankConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankConfig
     */
    omit?: BankConfigOmit<ExtArgs> | null
    /**
     * The data needed to update a BankConfig.
     */
    data: XOR<BankConfigUpdateInput, BankConfigUncheckedUpdateInput>
    /**
     * Choose, which BankConfig to update.
     */
    where: BankConfigWhereUniqueInput
  }

  /**
   * BankConfig updateMany
   */
  export type BankConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BankConfigs.
     */
    data: XOR<BankConfigUpdateManyMutationInput, BankConfigUncheckedUpdateManyInput>
    /**
     * Filter which BankConfigs to update
     */
    where?: BankConfigWhereInput
    /**
     * Limit how many BankConfigs to update.
     */
    limit?: number
  }

  /**
   * BankConfig updateManyAndReturn
   */
  export type BankConfigUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankConfig
     */
    select?: BankConfigSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BankConfig
     */
    omit?: BankConfigOmit<ExtArgs> | null
    /**
     * The data used to update BankConfigs.
     */
    data: XOR<BankConfigUpdateManyMutationInput, BankConfigUncheckedUpdateManyInput>
    /**
     * Filter which BankConfigs to update
     */
    where?: BankConfigWhereInput
    /**
     * Limit how many BankConfigs to update.
     */
    limit?: number
  }

  /**
   * BankConfig upsert
   */
  export type BankConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankConfig
     */
    select?: BankConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankConfig
     */
    omit?: BankConfigOmit<ExtArgs> | null
    /**
     * The filter to search for the BankConfig to update in case it exists.
     */
    where: BankConfigWhereUniqueInput
    /**
     * In case the BankConfig found by the `where` argument doesn't exist, create a new BankConfig with this data.
     */
    create: XOR<BankConfigCreateInput, BankConfigUncheckedCreateInput>
    /**
     * In case the BankConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BankConfigUpdateInput, BankConfigUncheckedUpdateInput>
  }

  /**
   * BankConfig delete
   */
  export type BankConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankConfig
     */
    select?: BankConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankConfig
     */
    omit?: BankConfigOmit<ExtArgs> | null
    /**
     * Filter which BankConfig to delete.
     */
    where: BankConfigWhereUniqueInput
  }

  /**
   * BankConfig deleteMany
   */
  export type BankConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BankConfigs to delete
     */
    where?: BankConfigWhereInput
    /**
     * Limit how many BankConfigs to delete.
     */
    limit?: number
  }

  /**
   * BankConfig without action
   */
  export type BankConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankConfig
     */
    select?: BankConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BankConfig
     */
    omit?: BankConfigOmit<ExtArgs> | null
  }


  /**
   * Model InterestRate
   */

  export type AggregateInterestRate = {
    _count: InterestRateCountAggregateOutputType | null
    _avg: InterestRateAvgAggregateOutputType | null
    _sum: InterestRateSumAggregateOutputType | null
    _min: InterestRateMinAggregateOutputType | null
    _max: InterestRateMaxAggregateOutputType | null
  }

  export type InterestRateAvgAggregateOutputType = {
    id: number | null
  }

  export type InterestRateSumAggregateOutputType = {
    id: number | null
  }

  export type InterestRateMinAggregateOutputType = {
    id: number | null
    type: string | null
    product: string | null
    effectiveDate: string | null
    rate: string | null
    circular: string | null
    isAnyAmount: boolean | null
    amountFrom: string | null
    amountTo: string | null
  }

  export type InterestRateMaxAggregateOutputType = {
    id: number | null
    type: string | null
    product: string | null
    effectiveDate: string | null
    rate: string | null
    circular: string | null
    isAnyAmount: boolean | null
    amountFrom: string | null
    amountTo: string | null
  }

  export type InterestRateCountAggregateOutputType = {
    id: number
    type: number
    product: number
    effectiveDate: number
    rate: number
    circular: number
    isAnyAmount: number
    amountFrom: number
    amountTo: number
    _all: number
  }


  export type InterestRateAvgAggregateInputType = {
    id?: true
  }

  export type InterestRateSumAggregateInputType = {
    id?: true
  }

  export type InterestRateMinAggregateInputType = {
    id?: true
    type?: true
    product?: true
    effectiveDate?: true
    rate?: true
    circular?: true
    isAnyAmount?: true
    amountFrom?: true
    amountTo?: true
  }

  export type InterestRateMaxAggregateInputType = {
    id?: true
    type?: true
    product?: true
    effectiveDate?: true
    rate?: true
    circular?: true
    isAnyAmount?: true
    amountFrom?: true
    amountTo?: true
  }

  export type InterestRateCountAggregateInputType = {
    id?: true
    type?: true
    product?: true
    effectiveDate?: true
    rate?: true
    circular?: true
    isAnyAmount?: true
    amountFrom?: true
    amountTo?: true
    _all?: true
  }

  export type InterestRateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InterestRate to aggregate.
     */
    where?: InterestRateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InterestRates to fetch.
     */
    orderBy?: InterestRateOrderByWithRelationInput | InterestRateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InterestRateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InterestRates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InterestRates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InterestRates
    **/
    _count?: true | InterestRateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InterestRateAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InterestRateSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InterestRateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InterestRateMaxAggregateInputType
  }

  export type GetInterestRateAggregateType<T extends InterestRateAggregateArgs> = {
        [P in keyof T & keyof AggregateInterestRate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInterestRate[P]>
      : GetScalarType<T[P], AggregateInterestRate[P]>
  }




  export type InterestRateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InterestRateWhereInput
    orderBy?: InterestRateOrderByWithAggregationInput | InterestRateOrderByWithAggregationInput[]
    by: InterestRateScalarFieldEnum[] | InterestRateScalarFieldEnum
    having?: InterestRateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InterestRateCountAggregateInputType | true
    _avg?: InterestRateAvgAggregateInputType
    _sum?: InterestRateSumAggregateInputType
    _min?: InterestRateMinAggregateInputType
    _max?: InterestRateMaxAggregateInputType
  }

  export type InterestRateGroupByOutputType = {
    id: number
    type: string
    product: string
    effectiveDate: string
    rate: string
    circular: string | null
    isAnyAmount: boolean
    amountFrom: string | null
    amountTo: string | null
    _count: InterestRateCountAggregateOutputType | null
    _avg: InterestRateAvgAggregateOutputType | null
    _sum: InterestRateSumAggregateOutputType | null
    _min: InterestRateMinAggregateOutputType | null
    _max: InterestRateMaxAggregateOutputType | null
  }

  type GetInterestRateGroupByPayload<T extends InterestRateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InterestRateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InterestRateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InterestRateGroupByOutputType[P]>
            : GetScalarType<T[P], InterestRateGroupByOutputType[P]>
        }
      >
    >


  export type InterestRateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    product?: boolean
    effectiveDate?: boolean
    rate?: boolean
    circular?: boolean
    isAnyAmount?: boolean
    amountFrom?: boolean
    amountTo?: boolean
  }, ExtArgs["result"]["interestRate"]>

  export type InterestRateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    product?: boolean
    effectiveDate?: boolean
    rate?: boolean
    circular?: boolean
    isAnyAmount?: boolean
    amountFrom?: boolean
    amountTo?: boolean
  }, ExtArgs["result"]["interestRate"]>

  export type InterestRateSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    product?: boolean
    effectiveDate?: boolean
    rate?: boolean
    circular?: boolean
    isAnyAmount?: boolean
    amountFrom?: boolean
    amountTo?: boolean
  }, ExtArgs["result"]["interestRate"]>

  export type InterestRateSelectScalar = {
    id?: boolean
    type?: boolean
    product?: boolean
    effectiveDate?: boolean
    rate?: boolean
    circular?: boolean
    isAnyAmount?: boolean
    amountFrom?: boolean
    amountTo?: boolean
  }

  export type InterestRateOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "product" | "effectiveDate" | "rate" | "circular" | "isAnyAmount" | "amountFrom" | "amountTo", ExtArgs["result"]["interestRate"]>

  export type $InterestRatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "InterestRate"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      type: string
      product: string
      effectiveDate: string
      rate: string
      circular: string | null
      isAnyAmount: boolean
      amountFrom: string | null
      amountTo: string | null
    }, ExtArgs["result"]["interestRate"]>
    composites: {}
  }

  type InterestRateGetPayload<S extends boolean | null | undefined | InterestRateDefaultArgs> = $Result.GetResult<Prisma.$InterestRatePayload, S>

  type InterestRateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InterestRateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InterestRateCountAggregateInputType | true
    }

  export interface InterestRateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['InterestRate'], meta: { name: 'InterestRate' } }
    /**
     * Find zero or one InterestRate that matches the filter.
     * @param {InterestRateFindUniqueArgs} args - Arguments to find a InterestRate
     * @example
     * // Get one InterestRate
     * const interestRate = await prisma.interestRate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InterestRateFindUniqueArgs>(args: SelectSubset<T, InterestRateFindUniqueArgs<ExtArgs>>): Prisma__InterestRateClient<$Result.GetResult<Prisma.$InterestRatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one InterestRate that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InterestRateFindUniqueOrThrowArgs} args - Arguments to find a InterestRate
     * @example
     * // Get one InterestRate
     * const interestRate = await prisma.interestRate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InterestRateFindUniqueOrThrowArgs>(args: SelectSubset<T, InterestRateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InterestRateClient<$Result.GetResult<Prisma.$InterestRatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InterestRate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterestRateFindFirstArgs} args - Arguments to find a InterestRate
     * @example
     * // Get one InterestRate
     * const interestRate = await prisma.interestRate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InterestRateFindFirstArgs>(args?: SelectSubset<T, InterestRateFindFirstArgs<ExtArgs>>): Prisma__InterestRateClient<$Result.GetResult<Prisma.$InterestRatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InterestRate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterestRateFindFirstOrThrowArgs} args - Arguments to find a InterestRate
     * @example
     * // Get one InterestRate
     * const interestRate = await prisma.interestRate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InterestRateFindFirstOrThrowArgs>(args?: SelectSubset<T, InterestRateFindFirstOrThrowArgs<ExtArgs>>): Prisma__InterestRateClient<$Result.GetResult<Prisma.$InterestRatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more InterestRates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterestRateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InterestRates
     * const interestRates = await prisma.interestRate.findMany()
     * 
     * // Get first 10 InterestRates
     * const interestRates = await prisma.interestRate.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const interestRateWithIdOnly = await prisma.interestRate.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InterestRateFindManyArgs>(args?: SelectSubset<T, InterestRateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InterestRatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a InterestRate.
     * @param {InterestRateCreateArgs} args - Arguments to create a InterestRate.
     * @example
     * // Create one InterestRate
     * const InterestRate = await prisma.interestRate.create({
     *   data: {
     *     // ... data to create a InterestRate
     *   }
     * })
     * 
     */
    create<T extends InterestRateCreateArgs>(args: SelectSubset<T, InterestRateCreateArgs<ExtArgs>>): Prisma__InterestRateClient<$Result.GetResult<Prisma.$InterestRatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many InterestRates.
     * @param {InterestRateCreateManyArgs} args - Arguments to create many InterestRates.
     * @example
     * // Create many InterestRates
     * const interestRate = await prisma.interestRate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InterestRateCreateManyArgs>(args?: SelectSubset<T, InterestRateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many InterestRates and returns the data saved in the database.
     * @param {InterestRateCreateManyAndReturnArgs} args - Arguments to create many InterestRates.
     * @example
     * // Create many InterestRates
     * const interestRate = await prisma.interestRate.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many InterestRates and only return the `id`
     * const interestRateWithIdOnly = await prisma.interestRate.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InterestRateCreateManyAndReturnArgs>(args?: SelectSubset<T, InterestRateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InterestRatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a InterestRate.
     * @param {InterestRateDeleteArgs} args - Arguments to delete one InterestRate.
     * @example
     * // Delete one InterestRate
     * const InterestRate = await prisma.interestRate.delete({
     *   where: {
     *     // ... filter to delete one InterestRate
     *   }
     * })
     * 
     */
    delete<T extends InterestRateDeleteArgs>(args: SelectSubset<T, InterestRateDeleteArgs<ExtArgs>>): Prisma__InterestRateClient<$Result.GetResult<Prisma.$InterestRatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one InterestRate.
     * @param {InterestRateUpdateArgs} args - Arguments to update one InterestRate.
     * @example
     * // Update one InterestRate
     * const interestRate = await prisma.interestRate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InterestRateUpdateArgs>(args: SelectSubset<T, InterestRateUpdateArgs<ExtArgs>>): Prisma__InterestRateClient<$Result.GetResult<Prisma.$InterestRatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more InterestRates.
     * @param {InterestRateDeleteManyArgs} args - Arguments to filter InterestRates to delete.
     * @example
     * // Delete a few InterestRates
     * const { count } = await prisma.interestRate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InterestRateDeleteManyArgs>(args?: SelectSubset<T, InterestRateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InterestRates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterestRateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InterestRates
     * const interestRate = await prisma.interestRate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InterestRateUpdateManyArgs>(args: SelectSubset<T, InterestRateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InterestRates and returns the data updated in the database.
     * @param {InterestRateUpdateManyAndReturnArgs} args - Arguments to update many InterestRates.
     * @example
     * // Update many InterestRates
     * const interestRate = await prisma.interestRate.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more InterestRates and only return the `id`
     * const interestRateWithIdOnly = await prisma.interestRate.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends InterestRateUpdateManyAndReturnArgs>(args: SelectSubset<T, InterestRateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InterestRatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one InterestRate.
     * @param {InterestRateUpsertArgs} args - Arguments to update or create a InterestRate.
     * @example
     * // Update or create a InterestRate
     * const interestRate = await prisma.interestRate.upsert({
     *   create: {
     *     // ... data to create a InterestRate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InterestRate we want to update
     *   }
     * })
     */
    upsert<T extends InterestRateUpsertArgs>(args: SelectSubset<T, InterestRateUpsertArgs<ExtArgs>>): Prisma__InterestRateClient<$Result.GetResult<Prisma.$InterestRatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of InterestRates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterestRateCountArgs} args - Arguments to filter InterestRates to count.
     * @example
     * // Count the number of InterestRates
     * const count = await prisma.interestRate.count({
     *   where: {
     *     // ... the filter for the InterestRates we want to count
     *   }
     * })
    **/
    count<T extends InterestRateCountArgs>(
      args?: Subset<T, InterestRateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InterestRateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InterestRate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterestRateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InterestRateAggregateArgs>(args: Subset<T, InterestRateAggregateArgs>): Prisma.PrismaPromise<GetInterestRateAggregateType<T>>

    /**
     * Group by InterestRate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterestRateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InterestRateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InterestRateGroupByArgs['orderBy'] }
        : { orderBy?: InterestRateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InterestRateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInterestRateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the InterestRate model
   */
  readonly fields: InterestRateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for InterestRate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InterestRateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the InterestRate model
   */
  interface InterestRateFieldRefs {
    readonly id: FieldRef<"InterestRate", 'Int'>
    readonly type: FieldRef<"InterestRate", 'String'>
    readonly product: FieldRef<"InterestRate", 'String'>
    readonly effectiveDate: FieldRef<"InterestRate", 'String'>
    readonly rate: FieldRef<"InterestRate", 'String'>
    readonly circular: FieldRef<"InterestRate", 'String'>
    readonly isAnyAmount: FieldRef<"InterestRate", 'Boolean'>
    readonly amountFrom: FieldRef<"InterestRate", 'String'>
    readonly amountTo: FieldRef<"InterestRate", 'String'>
  }
    

  // Custom InputTypes
  /**
   * InterestRate findUnique
   */
  export type InterestRateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterestRate
     */
    select?: InterestRateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterestRate
     */
    omit?: InterestRateOmit<ExtArgs> | null
    /**
     * Filter, which InterestRate to fetch.
     */
    where: InterestRateWhereUniqueInput
  }

  /**
   * InterestRate findUniqueOrThrow
   */
  export type InterestRateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterestRate
     */
    select?: InterestRateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterestRate
     */
    omit?: InterestRateOmit<ExtArgs> | null
    /**
     * Filter, which InterestRate to fetch.
     */
    where: InterestRateWhereUniqueInput
  }

  /**
   * InterestRate findFirst
   */
  export type InterestRateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterestRate
     */
    select?: InterestRateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterestRate
     */
    omit?: InterestRateOmit<ExtArgs> | null
    /**
     * Filter, which InterestRate to fetch.
     */
    where?: InterestRateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InterestRates to fetch.
     */
    orderBy?: InterestRateOrderByWithRelationInput | InterestRateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InterestRates.
     */
    cursor?: InterestRateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InterestRates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InterestRates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InterestRates.
     */
    distinct?: InterestRateScalarFieldEnum | InterestRateScalarFieldEnum[]
  }

  /**
   * InterestRate findFirstOrThrow
   */
  export type InterestRateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterestRate
     */
    select?: InterestRateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterestRate
     */
    omit?: InterestRateOmit<ExtArgs> | null
    /**
     * Filter, which InterestRate to fetch.
     */
    where?: InterestRateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InterestRates to fetch.
     */
    orderBy?: InterestRateOrderByWithRelationInput | InterestRateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InterestRates.
     */
    cursor?: InterestRateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InterestRates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InterestRates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InterestRates.
     */
    distinct?: InterestRateScalarFieldEnum | InterestRateScalarFieldEnum[]
  }

  /**
   * InterestRate findMany
   */
  export type InterestRateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterestRate
     */
    select?: InterestRateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterestRate
     */
    omit?: InterestRateOmit<ExtArgs> | null
    /**
     * Filter, which InterestRates to fetch.
     */
    where?: InterestRateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InterestRates to fetch.
     */
    orderBy?: InterestRateOrderByWithRelationInput | InterestRateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InterestRates.
     */
    cursor?: InterestRateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InterestRates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InterestRates.
     */
    skip?: number
    distinct?: InterestRateScalarFieldEnum | InterestRateScalarFieldEnum[]
  }

  /**
   * InterestRate create
   */
  export type InterestRateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterestRate
     */
    select?: InterestRateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterestRate
     */
    omit?: InterestRateOmit<ExtArgs> | null
    /**
     * The data needed to create a InterestRate.
     */
    data: XOR<InterestRateCreateInput, InterestRateUncheckedCreateInput>
  }

  /**
   * InterestRate createMany
   */
  export type InterestRateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many InterestRates.
     */
    data: InterestRateCreateManyInput | InterestRateCreateManyInput[]
  }

  /**
   * InterestRate createManyAndReturn
   */
  export type InterestRateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterestRate
     */
    select?: InterestRateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the InterestRate
     */
    omit?: InterestRateOmit<ExtArgs> | null
    /**
     * The data used to create many InterestRates.
     */
    data: InterestRateCreateManyInput | InterestRateCreateManyInput[]
  }

  /**
   * InterestRate update
   */
  export type InterestRateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterestRate
     */
    select?: InterestRateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterestRate
     */
    omit?: InterestRateOmit<ExtArgs> | null
    /**
     * The data needed to update a InterestRate.
     */
    data: XOR<InterestRateUpdateInput, InterestRateUncheckedUpdateInput>
    /**
     * Choose, which InterestRate to update.
     */
    where: InterestRateWhereUniqueInput
  }

  /**
   * InterestRate updateMany
   */
  export type InterestRateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update InterestRates.
     */
    data: XOR<InterestRateUpdateManyMutationInput, InterestRateUncheckedUpdateManyInput>
    /**
     * Filter which InterestRates to update
     */
    where?: InterestRateWhereInput
    /**
     * Limit how many InterestRates to update.
     */
    limit?: number
  }

  /**
   * InterestRate updateManyAndReturn
   */
  export type InterestRateUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterestRate
     */
    select?: InterestRateSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the InterestRate
     */
    omit?: InterestRateOmit<ExtArgs> | null
    /**
     * The data used to update InterestRates.
     */
    data: XOR<InterestRateUpdateManyMutationInput, InterestRateUncheckedUpdateManyInput>
    /**
     * Filter which InterestRates to update
     */
    where?: InterestRateWhereInput
    /**
     * Limit how many InterestRates to update.
     */
    limit?: number
  }

  /**
   * InterestRate upsert
   */
  export type InterestRateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterestRate
     */
    select?: InterestRateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterestRate
     */
    omit?: InterestRateOmit<ExtArgs> | null
    /**
     * The filter to search for the InterestRate to update in case it exists.
     */
    where: InterestRateWhereUniqueInput
    /**
     * In case the InterestRate found by the `where` argument doesn't exist, create a new InterestRate with this data.
     */
    create: XOR<InterestRateCreateInput, InterestRateUncheckedCreateInput>
    /**
     * In case the InterestRate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InterestRateUpdateInput, InterestRateUncheckedUpdateInput>
  }

  /**
   * InterestRate delete
   */
  export type InterestRateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterestRate
     */
    select?: InterestRateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterestRate
     */
    omit?: InterestRateOmit<ExtArgs> | null
    /**
     * Filter which InterestRate to delete.
     */
    where: InterestRateWhereUniqueInput
  }

  /**
   * InterestRate deleteMany
   */
  export type InterestRateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InterestRates to delete
     */
    where?: InterestRateWhereInput
    /**
     * Limit how many InterestRates to delete.
     */
    limit?: number
  }

  /**
   * InterestRate without action
   */
  export type InterestRateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterestRate
     */
    select?: InterestRateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterestRate
     */
    omit?: InterestRateOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    roll_number: 'roll_number',
    password_hash: 'password_hash',
    role: 'role',
    office_level: 'office_level',
    full_name: 'full_name',
    full_name_hindi: 'full_name_hindi',
    mobile: 'mobile',
    designation: 'designation',
    designation_hindi: 'designation_hindi',
    photo_url: 'photo_url',
    is_head: 'is_head',
    is_deleted: 'is_deleted',
    must_change_password: 'must_change_password',
    linked_branch_code: 'linked_branch_code',
    linked_region_code: 'linked_region_code',
    departments: 'departments',
    history: 'history',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const BranchScalarFieldEnum: {
    id: 'id',
    branch_code: 'branch_code',
    branch_name: 'branch_name',
    branch_type: 'branch_type',
    category: 'category',
    region_code: 'region_code',
    state: 'state',
    district: 'district',
    taluk: 'taluk',
    revenue_centre: 'revenue_centre',
    locality: 'locality',
    latitude: 'latitude',
    longitude: 'longitude',
    pincode: 'pincode',
    is_deleted: 'is_deleted',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BranchScalarFieldEnum = (typeof BranchScalarFieldEnum)[keyof typeof BranchScalarFieldEnum]


  export const RegionScalarFieldEnum: {
    id: 'id',
    region_code: 'region_code',
    region_name: 'region_name',
    region_name_hindi: 'region_name_hindi',
    region_name_local: 'region_name_local',
    region_address: 'region_address',
    region_address_hindi: 'region_address_hindi',
    region_address_local: 'region_address_local',
    head_office_code: 'head_office_code',
    is_deleted: 'is_deleted',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RegionScalarFieldEnum = (typeof RegionScalarFieldEnum)[keyof typeof RegionScalarFieldEnum]


  export const DivisionScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type DivisionScalarFieldEnum = (typeof DivisionScalarFieldEnum)[keyof typeof DivisionScalarFieldEnum]


  export const DesignationScalarFieldEnum: {
    id: 'id',
    title: 'title',
    workclass: 'workclass'
  };

  export type DesignationScalarFieldEnum = (typeof DesignationScalarFieldEnum)[keyof typeof DesignationScalarFieldEnum]


  export const CampaignScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    department_code: 'department_code',
    startDate: 'startDate',
    endDate: 'endDate',
    type: 'type',
    unit: 'unit',
    status: 'status',
    image: 'image',
    overall_target: 'overall_target',
    data: 'data',
    achievement_entries: 'achievement_entries',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CampaignScalarFieldEnum = (typeof CampaignScalarFieldEnum)[keyof typeof CampaignScalarFieldEnum]


  export const DocumentScalarFieldEnum: {
    id: 'id',
    category: 'category',
    type: 'type',
    subject: 'subject',
    content: 'content',
    refNo: 'refNo',
    status: 'status',
    formData: 'formData',
    is_deleted: 'is_deleted',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DocumentScalarFieldEnum = (typeof DocumentScalarFieldEnum)[keyof typeof DocumentScalarFieldEnum]


  export const BranchSurveyScalarFieldEnum: {
    id: 'id',
    refNo: 'refNo',
    region: 'region',
    applicationType: 'applicationType',
    date: 'date',
    branch_name: 'branch_name',
    formData: 'formData',
    is_deleted: 'is_deleted',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BranchSurveyScalarFieldEnum = (typeof BranchSurveyScalarFieldEnum)[keyof typeof BranchSurveyScalarFieldEnum]


  export const BankConfigScalarFieldEnum: {
    id: 'id',
    name_english: 'name_english',
    name_hindi: 'name_hindi',
    name_local: 'name_local',
    dept_english: 'dept_english',
    dept_hindi: 'dept_hindi',
    dept_local: 'dept_local'
  };

  export type BankConfigScalarFieldEnum = (typeof BankConfigScalarFieldEnum)[keyof typeof BankConfigScalarFieldEnum]


  export const InterestRateScalarFieldEnum: {
    id: 'id',
    type: 'type',
    product: 'product',
    effectiveDate: 'effectiveDate',
    rate: 'rate',
    circular: 'circular',
    isAnyAmount: 'isAnyAmount',
    amountFrom: 'amountFrom',
    amountTo: 'amountTo'
  };

  export type InterestRateScalarFieldEnum = (typeof InterestRateScalarFieldEnum)[keyof typeof InterestRateScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    roll_number?: StringFilter<"User"> | string
    password_hash?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    office_level?: StringFilter<"User"> | string
    full_name?: StringFilter<"User"> | string
    full_name_hindi?: StringNullableFilter<"User"> | string | null
    mobile?: StringNullableFilter<"User"> | string | null
    designation?: StringNullableFilter<"User"> | string | null
    designation_hindi?: StringNullableFilter<"User"> | string | null
    photo_url?: StringNullableFilter<"User"> | string | null
    is_head?: BoolFilter<"User"> | boolean
    is_deleted?: BoolFilter<"User"> | boolean
    must_change_password?: BoolFilter<"User"> | boolean
    linked_branch_code?: StringNullableFilter<"User"> | string | null
    linked_region_code?: StringNullableFilter<"User"> | string | null
    departments?: StringNullableFilter<"User"> | string | null
    history?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    roll_number?: SortOrder
    password_hash?: SortOrder
    role?: SortOrder
    office_level?: SortOrder
    full_name?: SortOrder
    full_name_hindi?: SortOrderInput | SortOrder
    mobile?: SortOrderInput | SortOrder
    designation?: SortOrderInput | SortOrder
    designation_hindi?: SortOrderInput | SortOrder
    photo_url?: SortOrderInput | SortOrder
    is_head?: SortOrder
    is_deleted?: SortOrder
    must_change_password?: SortOrder
    linked_branch_code?: SortOrderInput | SortOrder
    linked_region_code?: SortOrderInput | SortOrder
    departments?: SortOrderInput | SortOrder
    history?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    roll_number?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password_hash?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    office_level?: StringFilter<"User"> | string
    full_name?: StringFilter<"User"> | string
    full_name_hindi?: StringNullableFilter<"User"> | string | null
    mobile?: StringNullableFilter<"User"> | string | null
    designation?: StringNullableFilter<"User"> | string | null
    designation_hindi?: StringNullableFilter<"User"> | string | null
    photo_url?: StringNullableFilter<"User"> | string | null
    is_head?: BoolFilter<"User"> | boolean
    is_deleted?: BoolFilter<"User"> | boolean
    must_change_password?: BoolFilter<"User"> | boolean
    linked_branch_code?: StringNullableFilter<"User"> | string | null
    linked_region_code?: StringNullableFilter<"User"> | string | null
    departments?: StringNullableFilter<"User"> | string | null
    history?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }, "id" | "roll_number">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    roll_number?: SortOrder
    password_hash?: SortOrder
    role?: SortOrder
    office_level?: SortOrder
    full_name?: SortOrder
    full_name_hindi?: SortOrderInput | SortOrder
    mobile?: SortOrderInput | SortOrder
    designation?: SortOrderInput | SortOrder
    designation_hindi?: SortOrderInput | SortOrder
    photo_url?: SortOrderInput | SortOrder
    is_head?: SortOrder
    is_deleted?: SortOrder
    must_change_password?: SortOrder
    linked_branch_code?: SortOrderInput | SortOrder
    linked_region_code?: SortOrderInput | SortOrder
    departments?: SortOrderInput | SortOrder
    history?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    roll_number?: StringWithAggregatesFilter<"User"> | string
    password_hash?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
    office_level?: StringWithAggregatesFilter<"User"> | string
    full_name?: StringWithAggregatesFilter<"User"> | string
    full_name_hindi?: StringNullableWithAggregatesFilter<"User"> | string | null
    mobile?: StringNullableWithAggregatesFilter<"User"> | string | null
    designation?: StringNullableWithAggregatesFilter<"User"> | string | null
    designation_hindi?: StringNullableWithAggregatesFilter<"User"> | string | null
    photo_url?: StringNullableWithAggregatesFilter<"User"> | string | null
    is_head?: BoolWithAggregatesFilter<"User"> | boolean
    is_deleted?: BoolWithAggregatesFilter<"User"> | boolean
    must_change_password?: BoolWithAggregatesFilter<"User"> | boolean
    linked_branch_code?: StringNullableWithAggregatesFilter<"User"> | string | null
    linked_region_code?: StringNullableWithAggregatesFilter<"User"> | string | null
    departments?: StringNullableWithAggregatesFilter<"User"> | string | null
    history?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type BranchWhereInput = {
    AND?: BranchWhereInput | BranchWhereInput[]
    OR?: BranchWhereInput[]
    NOT?: BranchWhereInput | BranchWhereInput[]
    id?: IntFilter<"Branch"> | number
    branch_code?: StringFilter<"Branch"> | string
    branch_name?: StringFilter<"Branch"> | string
    branch_type?: StringNullableFilter<"Branch"> | string | null
    category?: StringNullableFilter<"Branch"> | string | null
    region_code?: StringNullableFilter<"Branch"> | string | null
    state?: StringNullableFilter<"Branch"> | string | null
    district?: StringNullableFilter<"Branch"> | string | null
    taluk?: StringNullableFilter<"Branch"> | string | null
    revenue_centre?: StringNullableFilter<"Branch"> | string | null
    locality?: StringNullableFilter<"Branch"> | string | null
    latitude?: StringNullableFilter<"Branch"> | string | null
    longitude?: StringNullableFilter<"Branch"> | string | null
    pincode?: StringNullableFilter<"Branch"> | string | null
    is_deleted?: BoolFilter<"Branch"> | boolean
    createdAt?: DateTimeFilter<"Branch"> | Date | string
    updatedAt?: DateTimeFilter<"Branch"> | Date | string
  }

  export type BranchOrderByWithRelationInput = {
    id?: SortOrder
    branch_code?: SortOrder
    branch_name?: SortOrder
    branch_type?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    region_code?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    district?: SortOrderInput | SortOrder
    taluk?: SortOrderInput | SortOrder
    revenue_centre?: SortOrderInput | SortOrder
    locality?: SortOrderInput | SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    pincode?: SortOrderInput | SortOrder
    is_deleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BranchWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    branch_code?: string
    AND?: BranchWhereInput | BranchWhereInput[]
    OR?: BranchWhereInput[]
    NOT?: BranchWhereInput | BranchWhereInput[]
    branch_name?: StringFilter<"Branch"> | string
    branch_type?: StringNullableFilter<"Branch"> | string | null
    category?: StringNullableFilter<"Branch"> | string | null
    region_code?: StringNullableFilter<"Branch"> | string | null
    state?: StringNullableFilter<"Branch"> | string | null
    district?: StringNullableFilter<"Branch"> | string | null
    taluk?: StringNullableFilter<"Branch"> | string | null
    revenue_centre?: StringNullableFilter<"Branch"> | string | null
    locality?: StringNullableFilter<"Branch"> | string | null
    latitude?: StringNullableFilter<"Branch"> | string | null
    longitude?: StringNullableFilter<"Branch"> | string | null
    pincode?: StringNullableFilter<"Branch"> | string | null
    is_deleted?: BoolFilter<"Branch"> | boolean
    createdAt?: DateTimeFilter<"Branch"> | Date | string
    updatedAt?: DateTimeFilter<"Branch"> | Date | string
  }, "id" | "branch_code">

  export type BranchOrderByWithAggregationInput = {
    id?: SortOrder
    branch_code?: SortOrder
    branch_name?: SortOrder
    branch_type?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    region_code?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    district?: SortOrderInput | SortOrder
    taluk?: SortOrderInput | SortOrder
    revenue_centre?: SortOrderInput | SortOrder
    locality?: SortOrderInput | SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    pincode?: SortOrderInput | SortOrder
    is_deleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BranchCountOrderByAggregateInput
    _avg?: BranchAvgOrderByAggregateInput
    _max?: BranchMaxOrderByAggregateInput
    _min?: BranchMinOrderByAggregateInput
    _sum?: BranchSumOrderByAggregateInput
  }

  export type BranchScalarWhereWithAggregatesInput = {
    AND?: BranchScalarWhereWithAggregatesInput | BranchScalarWhereWithAggregatesInput[]
    OR?: BranchScalarWhereWithAggregatesInput[]
    NOT?: BranchScalarWhereWithAggregatesInput | BranchScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Branch"> | number
    branch_code?: StringWithAggregatesFilter<"Branch"> | string
    branch_name?: StringWithAggregatesFilter<"Branch"> | string
    branch_type?: StringNullableWithAggregatesFilter<"Branch"> | string | null
    category?: StringNullableWithAggregatesFilter<"Branch"> | string | null
    region_code?: StringNullableWithAggregatesFilter<"Branch"> | string | null
    state?: StringNullableWithAggregatesFilter<"Branch"> | string | null
    district?: StringNullableWithAggregatesFilter<"Branch"> | string | null
    taluk?: StringNullableWithAggregatesFilter<"Branch"> | string | null
    revenue_centre?: StringNullableWithAggregatesFilter<"Branch"> | string | null
    locality?: StringNullableWithAggregatesFilter<"Branch"> | string | null
    latitude?: StringNullableWithAggregatesFilter<"Branch"> | string | null
    longitude?: StringNullableWithAggregatesFilter<"Branch"> | string | null
    pincode?: StringNullableWithAggregatesFilter<"Branch"> | string | null
    is_deleted?: BoolWithAggregatesFilter<"Branch"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Branch"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Branch"> | Date | string
  }

  export type RegionWhereInput = {
    AND?: RegionWhereInput | RegionWhereInput[]
    OR?: RegionWhereInput[]
    NOT?: RegionWhereInput | RegionWhereInput[]
    id?: IntFilter<"Region"> | number
    region_code?: StringFilter<"Region"> | string
    region_name?: StringFilter<"Region"> | string
    region_name_hindi?: StringNullableFilter<"Region"> | string | null
    region_name_local?: StringNullableFilter<"Region"> | string | null
    region_address?: StringNullableFilter<"Region"> | string | null
    region_address_hindi?: StringNullableFilter<"Region"> | string | null
    region_address_local?: StringNullableFilter<"Region"> | string | null
    head_office_code?: StringNullableFilter<"Region"> | string | null
    is_deleted?: BoolFilter<"Region"> | boolean
    createdAt?: DateTimeFilter<"Region"> | Date | string
    updatedAt?: DateTimeFilter<"Region"> | Date | string
  }

  export type RegionOrderByWithRelationInput = {
    id?: SortOrder
    region_code?: SortOrder
    region_name?: SortOrder
    region_name_hindi?: SortOrderInput | SortOrder
    region_name_local?: SortOrderInput | SortOrder
    region_address?: SortOrderInput | SortOrder
    region_address_hindi?: SortOrderInput | SortOrder
    region_address_local?: SortOrderInput | SortOrder
    head_office_code?: SortOrderInput | SortOrder
    is_deleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RegionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    region_code?: string
    AND?: RegionWhereInput | RegionWhereInput[]
    OR?: RegionWhereInput[]
    NOT?: RegionWhereInput | RegionWhereInput[]
    region_name?: StringFilter<"Region"> | string
    region_name_hindi?: StringNullableFilter<"Region"> | string | null
    region_name_local?: StringNullableFilter<"Region"> | string | null
    region_address?: StringNullableFilter<"Region"> | string | null
    region_address_hindi?: StringNullableFilter<"Region"> | string | null
    region_address_local?: StringNullableFilter<"Region"> | string | null
    head_office_code?: StringNullableFilter<"Region"> | string | null
    is_deleted?: BoolFilter<"Region"> | boolean
    createdAt?: DateTimeFilter<"Region"> | Date | string
    updatedAt?: DateTimeFilter<"Region"> | Date | string
  }, "id" | "region_code">

  export type RegionOrderByWithAggregationInput = {
    id?: SortOrder
    region_code?: SortOrder
    region_name?: SortOrder
    region_name_hindi?: SortOrderInput | SortOrder
    region_name_local?: SortOrderInput | SortOrder
    region_address?: SortOrderInput | SortOrder
    region_address_hindi?: SortOrderInput | SortOrder
    region_address_local?: SortOrderInput | SortOrder
    head_office_code?: SortOrderInput | SortOrder
    is_deleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RegionCountOrderByAggregateInput
    _avg?: RegionAvgOrderByAggregateInput
    _max?: RegionMaxOrderByAggregateInput
    _min?: RegionMinOrderByAggregateInput
    _sum?: RegionSumOrderByAggregateInput
  }

  export type RegionScalarWhereWithAggregatesInput = {
    AND?: RegionScalarWhereWithAggregatesInput | RegionScalarWhereWithAggregatesInput[]
    OR?: RegionScalarWhereWithAggregatesInput[]
    NOT?: RegionScalarWhereWithAggregatesInput | RegionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Region"> | number
    region_code?: StringWithAggregatesFilter<"Region"> | string
    region_name?: StringWithAggregatesFilter<"Region"> | string
    region_name_hindi?: StringNullableWithAggregatesFilter<"Region"> | string | null
    region_name_local?: StringNullableWithAggregatesFilter<"Region"> | string | null
    region_address?: StringNullableWithAggregatesFilter<"Region"> | string | null
    region_address_hindi?: StringNullableWithAggregatesFilter<"Region"> | string | null
    region_address_local?: StringNullableWithAggregatesFilter<"Region"> | string | null
    head_office_code?: StringNullableWithAggregatesFilter<"Region"> | string | null
    is_deleted?: BoolWithAggregatesFilter<"Region"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Region"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Region"> | Date | string
  }

  export type DivisionWhereInput = {
    AND?: DivisionWhereInput | DivisionWhereInput[]
    OR?: DivisionWhereInput[]
    NOT?: DivisionWhereInput | DivisionWhereInput[]
    id?: IntFilter<"Division"> | number
    name?: StringFilter<"Division"> | string
  }

  export type DivisionOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type DivisionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: DivisionWhereInput | DivisionWhereInput[]
    OR?: DivisionWhereInput[]
    NOT?: DivisionWhereInput | DivisionWhereInput[]
  }, "id" | "name">

  export type DivisionOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: DivisionCountOrderByAggregateInput
    _avg?: DivisionAvgOrderByAggregateInput
    _max?: DivisionMaxOrderByAggregateInput
    _min?: DivisionMinOrderByAggregateInput
    _sum?: DivisionSumOrderByAggregateInput
  }

  export type DivisionScalarWhereWithAggregatesInput = {
    AND?: DivisionScalarWhereWithAggregatesInput | DivisionScalarWhereWithAggregatesInput[]
    OR?: DivisionScalarWhereWithAggregatesInput[]
    NOT?: DivisionScalarWhereWithAggregatesInput | DivisionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Division"> | number
    name?: StringWithAggregatesFilter<"Division"> | string
  }

  export type DesignationWhereInput = {
    AND?: DesignationWhereInput | DesignationWhereInput[]
    OR?: DesignationWhereInput[]
    NOT?: DesignationWhereInput | DesignationWhereInput[]
    id?: IntFilter<"Designation"> | number
    title?: StringFilter<"Designation"> | string
    workclass?: IntFilter<"Designation"> | number
  }

  export type DesignationOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    workclass?: SortOrder
  }

  export type DesignationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    title?: string
    AND?: DesignationWhereInput | DesignationWhereInput[]
    OR?: DesignationWhereInput[]
    NOT?: DesignationWhereInput | DesignationWhereInput[]
    workclass?: IntFilter<"Designation"> | number
  }, "id" | "title">

  export type DesignationOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    workclass?: SortOrder
    _count?: DesignationCountOrderByAggregateInput
    _avg?: DesignationAvgOrderByAggregateInput
    _max?: DesignationMaxOrderByAggregateInput
    _min?: DesignationMinOrderByAggregateInput
    _sum?: DesignationSumOrderByAggregateInput
  }

  export type DesignationScalarWhereWithAggregatesInput = {
    AND?: DesignationScalarWhereWithAggregatesInput | DesignationScalarWhereWithAggregatesInput[]
    OR?: DesignationScalarWhereWithAggregatesInput[]
    NOT?: DesignationScalarWhereWithAggregatesInput | DesignationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Designation"> | number
    title?: StringWithAggregatesFilter<"Designation"> | string
    workclass?: IntWithAggregatesFilter<"Designation"> | number
  }

  export type CampaignWhereInput = {
    AND?: CampaignWhereInput | CampaignWhereInput[]
    OR?: CampaignWhereInput[]
    NOT?: CampaignWhereInput | CampaignWhereInput[]
    id?: StringFilter<"Campaign"> | string
    title?: StringFilter<"Campaign"> | string
    description?: StringNullableFilter<"Campaign"> | string | null
    department_code?: StringNullableFilter<"Campaign"> | string | null
    startDate?: StringNullableFilter<"Campaign"> | string | null
    endDate?: StringNullableFilter<"Campaign"> | string | null
    type?: StringNullableFilter<"Campaign"> | string | null
    unit?: StringNullableFilter<"Campaign"> | string | null
    status?: StringNullableFilter<"Campaign"> | string | null
    image?: StringNullableFilter<"Campaign"> | string | null
    overall_target?: FloatNullableFilter<"Campaign"> | number | null
    data?: StringNullableFilter<"Campaign"> | string | null
    achievement_entries?: StringNullableFilter<"Campaign"> | string | null
    createdAt?: DateTimeFilter<"Campaign"> | Date | string
    updatedAt?: DateTimeFilter<"Campaign"> | Date | string
  }

  export type CampaignOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    department_code?: SortOrderInput | SortOrder
    startDate?: SortOrderInput | SortOrder
    endDate?: SortOrderInput | SortOrder
    type?: SortOrderInput | SortOrder
    unit?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    overall_target?: SortOrderInput | SortOrder
    data?: SortOrderInput | SortOrder
    achievement_entries?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CampaignWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CampaignWhereInput | CampaignWhereInput[]
    OR?: CampaignWhereInput[]
    NOT?: CampaignWhereInput | CampaignWhereInput[]
    title?: StringFilter<"Campaign"> | string
    description?: StringNullableFilter<"Campaign"> | string | null
    department_code?: StringNullableFilter<"Campaign"> | string | null
    startDate?: StringNullableFilter<"Campaign"> | string | null
    endDate?: StringNullableFilter<"Campaign"> | string | null
    type?: StringNullableFilter<"Campaign"> | string | null
    unit?: StringNullableFilter<"Campaign"> | string | null
    status?: StringNullableFilter<"Campaign"> | string | null
    image?: StringNullableFilter<"Campaign"> | string | null
    overall_target?: FloatNullableFilter<"Campaign"> | number | null
    data?: StringNullableFilter<"Campaign"> | string | null
    achievement_entries?: StringNullableFilter<"Campaign"> | string | null
    createdAt?: DateTimeFilter<"Campaign"> | Date | string
    updatedAt?: DateTimeFilter<"Campaign"> | Date | string
  }, "id">

  export type CampaignOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    department_code?: SortOrderInput | SortOrder
    startDate?: SortOrderInput | SortOrder
    endDate?: SortOrderInput | SortOrder
    type?: SortOrderInput | SortOrder
    unit?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    overall_target?: SortOrderInput | SortOrder
    data?: SortOrderInput | SortOrder
    achievement_entries?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CampaignCountOrderByAggregateInput
    _avg?: CampaignAvgOrderByAggregateInput
    _max?: CampaignMaxOrderByAggregateInput
    _min?: CampaignMinOrderByAggregateInput
    _sum?: CampaignSumOrderByAggregateInput
  }

  export type CampaignScalarWhereWithAggregatesInput = {
    AND?: CampaignScalarWhereWithAggregatesInput | CampaignScalarWhereWithAggregatesInput[]
    OR?: CampaignScalarWhereWithAggregatesInput[]
    NOT?: CampaignScalarWhereWithAggregatesInput | CampaignScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Campaign"> | string
    title?: StringWithAggregatesFilter<"Campaign"> | string
    description?: StringNullableWithAggregatesFilter<"Campaign"> | string | null
    department_code?: StringNullableWithAggregatesFilter<"Campaign"> | string | null
    startDate?: StringNullableWithAggregatesFilter<"Campaign"> | string | null
    endDate?: StringNullableWithAggregatesFilter<"Campaign"> | string | null
    type?: StringNullableWithAggregatesFilter<"Campaign"> | string | null
    unit?: StringNullableWithAggregatesFilter<"Campaign"> | string | null
    status?: StringNullableWithAggregatesFilter<"Campaign"> | string | null
    image?: StringNullableWithAggregatesFilter<"Campaign"> | string | null
    overall_target?: FloatNullableWithAggregatesFilter<"Campaign"> | number | null
    data?: StringNullableWithAggregatesFilter<"Campaign"> | string | null
    achievement_entries?: StringNullableWithAggregatesFilter<"Campaign"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Campaign"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Campaign"> | Date | string
  }

  export type DocumentWhereInput = {
    AND?: DocumentWhereInput | DocumentWhereInput[]
    OR?: DocumentWhereInput[]
    NOT?: DocumentWhereInput | DocumentWhereInput[]
    id?: StringFilter<"Document"> | string
    category?: StringFilter<"Document"> | string
    type?: StringFilter<"Document"> | string
    subject?: StringFilter<"Document"> | string
    content?: StringNullableFilter<"Document"> | string | null
    refNo?: StringNullableFilter<"Document"> | string | null
    status?: StringFilter<"Document"> | string
    formData?: StringNullableFilter<"Document"> | string | null
    is_deleted?: BoolFilter<"Document"> | boolean
    createdAt?: DateTimeFilter<"Document"> | Date | string
    updatedAt?: DateTimeFilter<"Document"> | Date | string
  }

  export type DocumentOrderByWithRelationInput = {
    id?: SortOrder
    category?: SortOrder
    type?: SortOrder
    subject?: SortOrder
    content?: SortOrderInput | SortOrder
    refNo?: SortOrderInput | SortOrder
    status?: SortOrder
    formData?: SortOrderInput | SortOrder
    is_deleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DocumentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    refNo?: string
    AND?: DocumentWhereInput | DocumentWhereInput[]
    OR?: DocumentWhereInput[]
    NOT?: DocumentWhereInput | DocumentWhereInput[]
    category?: StringFilter<"Document"> | string
    type?: StringFilter<"Document"> | string
    subject?: StringFilter<"Document"> | string
    content?: StringNullableFilter<"Document"> | string | null
    status?: StringFilter<"Document"> | string
    formData?: StringNullableFilter<"Document"> | string | null
    is_deleted?: BoolFilter<"Document"> | boolean
    createdAt?: DateTimeFilter<"Document"> | Date | string
    updatedAt?: DateTimeFilter<"Document"> | Date | string
  }, "id" | "refNo">

  export type DocumentOrderByWithAggregationInput = {
    id?: SortOrder
    category?: SortOrder
    type?: SortOrder
    subject?: SortOrder
    content?: SortOrderInput | SortOrder
    refNo?: SortOrderInput | SortOrder
    status?: SortOrder
    formData?: SortOrderInput | SortOrder
    is_deleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DocumentCountOrderByAggregateInput
    _max?: DocumentMaxOrderByAggregateInput
    _min?: DocumentMinOrderByAggregateInput
  }

  export type DocumentScalarWhereWithAggregatesInput = {
    AND?: DocumentScalarWhereWithAggregatesInput | DocumentScalarWhereWithAggregatesInput[]
    OR?: DocumentScalarWhereWithAggregatesInput[]
    NOT?: DocumentScalarWhereWithAggregatesInput | DocumentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Document"> | string
    category?: StringWithAggregatesFilter<"Document"> | string
    type?: StringWithAggregatesFilter<"Document"> | string
    subject?: StringWithAggregatesFilter<"Document"> | string
    content?: StringNullableWithAggregatesFilter<"Document"> | string | null
    refNo?: StringNullableWithAggregatesFilter<"Document"> | string | null
    status?: StringWithAggregatesFilter<"Document"> | string
    formData?: StringNullableWithAggregatesFilter<"Document"> | string | null
    is_deleted?: BoolWithAggregatesFilter<"Document"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Document"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Document"> | Date | string
  }

  export type BranchSurveyWhereInput = {
    AND?: BranchSurveyWhereInput | BranchSurveyWhereInput[]
    OR?: BranchSurveyWhereInput[]
    NOT?: BranchSurveyWhereInput | BranchSurveyWhereInput[]
    id?: IntFilter<"BranchSurvey"> | number
    refNo?: StringNullableFilter<"BranchSurvey"> | string | null
    region?: StringNullableFilter<"BranchSurvey"> | string | null
    applicationType?: StringNullableFilter<"BranchSurvey"> | string | null
    date?: StringNullableFilter<"BranchSurvey"> | string | null
    branch_name?: StringNullableFilter<"BranchSurvey"> | string | null
    formData?: StringNullableFilter<"BranchSurvey"> | string | null
    is_deleted?: BoolFilter<"BranchSurvey"> | boolean
    createdAt?: DateTimeFilter<"BranchSurvey"> | Date | string
    updatedAt?: DateTimeFilter<"BranchSurvey"> | Date | string
  }

  export type BranchSurveyOrderByWithRelationInput = {
    id?: SortOrder
    refNo?: SortOrderInput | SortOrder
    region?: SortOrderInput | SortOrder
    applicationType?: SortOrderInput | SortOrder
    date?: SortOrderInput | SortOrder
    branch_name?: SortOrderInput | SortOrder
    formData?: SortOrderInput | SortOrder
    is_deleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BranchSurveyWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    refNo?: string
    AND?: BranchSurveyWhereInput | BranchSurveyWhereInput[]
    OR?: BranchSurveyWhereInput[]
    NOT?: BranchSurveyWhereInput | BranchSurveyWhereInput[]
    region?: StringNullableFilter<"BranchSurvey"> | string | null
    applicationType?: StringNullableFilter<"BranchSurvey"> | string | null
    date?: StringNullableFilter<"BranchSurvey"> | string | null
    branch_name?: StringNullableFilter<"BranchSurvey"> | string | null
    formData?: StringNullableFilter<"BranchSurvey"> | string | null
    is_deleted?: BoolFilter<"BranchSurvey"> | boolean
    createdAt?: DateTimeFilter<"BranchSurvey"> | Date | string
    updatedAt?: DateTimeFilter<"BranchSurvey"> | Date | string
  }, "id" | "refNo">

  export type BranchSurveyOrderByWithAggregationInput = {
    id?: SortOrder
    refNo?: SortOrderInput | SortOrder
    region?: SortOrderInput | SortOrder
    applicationType?: SortOrderInput | SortOrder
    date?: SortOrderInput | SortOrder
    branch_name?: SortOrderInput | SortOrder
    formData?: SortOrderInput | SortOrder
    is_deleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BranchSurveyCountOrderByAggregateInput
    _avg?: BranchSurveyAvgOrderByAggregateInput
    _max?: BranchSurveyMaxOrderByAggregateInput
    _min?: BranchSurveyMinOrderByAggregateInput
    _sum?: BranchSurveySumOrderByAggregateInput
  }

  export type BranchSurveyScalarWhereWithAggregatesInput = {
    AND?: BranchSurveyScalarWhereWithAggregatesInput | BranchSurveyScalarWhereWithAggregatesInput[]
    OR?: BranchSurveyScalarWhereWithAggregatesInput[]
    NOT?: BranchSurveyScalarWhereWithAggregatesInput | BranchSurveyScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"BranchSurvey"> | number
    refNo?: StringNullableWithAggregatesFilter<"BranchSurvey"> | string | null
    region?: StringNullableWithAggregatesFilter<"BranchSurvey"> | string | null
    applicationType?: StringNullableWithAggregatesFilter<"BranchSurvey"> | string | null
    date?: StringNullableWithAggregatesFilter<"BranchSurvey"> | string | null
    branch_name?: StringNullableWithAggregatesFilter<"BranchSurvey"> | string | null
    formData?: StringNullableWithAggregatesFilter<"BranchSurvey"> | string | null
    is_deleted?: BoolWithAggregatesFilter<"BranchSurvey"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"BranchSurvey"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"BranchSurvey"> | Date | string
  }

  export type BankConfigWhereInput = {
    AND?: BankConfigWhereInput | BankConfigWhereInput[]
    OR?: BankConfigWhereInput[]
    NOT?: BankConfigWhereInput | BankConfigWhereInput[]
    id?: IntFilter<"BankConfig"> | number
    name_english?: StringNullableFilter<"BankConfig"> | string | null
    name_hindi?: StringNullableFilter<"BankConfig"> | string | null
    name_local?: StringNullableFilter<"BankConfig"> | string | null
    dept_english?: StringNullableFilter<"BankConfig"> | string | null
    dept_hindi?: StringNullableFilter<"BankConfig"> | string | null
    dept_local?: StringNullableFilter<"BankConfig"> | string | null
  }

  export type BankConfigOrderByWithRelationInput = {
    id?: SortOrder
    name_english?: SortOrderInput | SortOrder
    name_hindi?: SortOrderInput | SortOrder
    name_local?: SortOrderInput | SortOrder
    dept_english?: SortOrderInput | SortOrder
    dept_hindi?: SortOrderInput | SortOrder
    dept_local?: SortOrderInput | SortOrder
  }

  export type BankConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: BankConfigWhereInput | BankConfigWhereInput[]
    OR?: BankConfigWhereInput[]
    NOT?: BankConfigWhereInput | BankConfigWhereInput[]
    name_english?: StringNullableFilter<"BankConfig"> | string | null
    name_hindi?: StringNullableFilter<"BankConfig"> | string | null
    name_local?: StringNullableFilter<"BankConfig"> | string | null
    dept_english?: StringNullableFilter<"BankConfig"> | string | null
    dept_hindi?: StringNullableFilter<"BankConfig"> | string | null
    dept_local?: StringNullableFilter<"BankConfig"> | string | null
  }, "id">

  export type BankConfigOrderByWithAggregationInput = {
    id?: SortOrder
    name_english?: SortOrderInput | SortOrder
    name_hindi?: SortOrderInput | SortOrder
    name_local?: SortOrderInput | SortOrder
    dept_english?: SortOrderInput | SortOrder
    dept_hindi?: SortOrderInput | SortOrder
    dept_local?: SortOrderInput | SortOrder
    _count?: BankConfigCountOrderByAggregateInput
    _avg?: BankConfigAvgOrderByAggregateInput
    _max?: BankConfigMaxOrderByAggregateInput
    _min?: BankConfigMinOrderByAggregateInput
    _sum?: BankConfigSumOrderByAggregateInput
  }

  export type BankConfigScalarWhereWithAggregatesInput = {
    AND?: BankConfigScalarWhereWithAggregatesInput | BankConfigScalarWhereWithAggregatesInput[]
    OR?: BankConfigScalarWhereWithAggregatesInput[]
    NOT?: BankConfigScalarWhereWithAggregatesInput | BankConfigScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"BankConfig"> | number
    name_english?: StringNullableWithAggregatesFilter<"BankConfig"> | string | null
    name_hindi?: StringNullableWithAggregatesFilter<"BankConfig"> | string | null
    name_local?: StringNullableWithAggregatesFilter<"BankConfig"> | string | null
    dept_english?: StringNullableWithAggregatesFilter<"BankConfig"> | string | null
    dept_hindi?: StringNullableWithAggregatesFilter<"BankConfig"> | string | null
    dept_local?: StringNullableWithAggregatesFilter<"BankConfig"> | string | null
  }

  export type InterestRateWhereInput = {
    AND?: InterestRateWhereInput | InterestRateWhereInput[]
    OR?: InterestRateWhereInput[]
    NOT?: InterestRateWhereInput | InterestRateWhereInput[]
    id?: IntFilter<"InterestRate"> | number
    type?: StringFilter<"InterestRate"> | string
    product?: StringFilter<"InterestRate"> | string
    effectiveDate?: StringFilter<"InterestRate"> | string
    rate?: StringFilter<"InterestRate"> | string
    circular?: StringNullableFilter<"InterestRate"> | string | null
    isAnyAmount?: BoolFilter<"InterestRate"> | boolean
    amountFrom?: StringNullableFilter<"InterestRate"> | string | null
    amountTo?: StringNullableFilter<"InterestRate"> | string | null
  }

  export type InterestRateOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    product?: SortOrder
    effectiveDate?: SortOrder
    rate?: SortOrder
    circular?: SortOrderInput | SortOrder
    isAnyAmount?: SortOrder
    amountFrom?: SortOrderInput | SortOrder
    amountTo?: SortOrderInput | SortOrder
  }

  export type InterestRateWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: InterestRateWhereInput | InterestRateWhereInput[]
    OR?: InterestRateWhereInput[]
    NOT?: InterestRateWhereInput | InterestRateWhereInput[]
    type?: StringFilter<"InterestRate"> | string
    product?: StringFilter<"InterestRate"> | string
    effectiveDate?: StringFilter<"InterestRate"> | string
    rate?: StringFilter<"InterestRate"> | string
    circular?: StringNullableFilter<"InterestRate"> | string | null
    isAnyAmount?: BoolFilter<"InterestRate"> | boolean
    amountFrom?: StringNullableFilter<"InterestRate"> | string | null
    amountTo?: StringNullableFilter<"InterestRate"> | string | null
  }, "id">

  export type InterestRateOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    product?: SortOrder
    effectiveDate?: SortOrder
    rate?: SortOrder
    circular?: SortOrderInput | SortOrder
    isAnyAmount?: SortOrder
    amountFrom?: SortOrderInput | SortOrder
    amountTo?: SortOrderInput | SortOrder
    _count?: InterestRateCountOrderByAggregateInput
    _avg?: InterestRateAvgOrderByAggregateInput
    _max?: InterestRateMaxOrderByAggregateInput
    _min?: InterestRateMinOrderByAggregateInput
    _sum?: InterestRateSumOrderByAggregateInput
  }

  export type InterestRateScalarWhereWithAggregatesInput = {
    AND?: InterestRateScalarWhereWithAggregatesInput | InterestRateScalarWhereWithAggregatesInput[]
    OR?: InterestRateScalarWhereWithAggregatesInput[]
    NOT?: InterestRateScalarWhereWithAggregatesInput | InterestRateScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"InterestRate"> | number
    type?: StringWithAggregatesFilter<"InterestRate"> | string
    product?: StringWithAggregatesFilter<"InterestRate"> | string
    effectiveDate?: StringWithAggregatesFilter<"InterestRate"> | string
    rate?: StringWithAggregatesFilter<"InterestRate"> | string
    circular?: StringNullableWithAggregatesFilter<"InterestRate"> | string | null
    isAnyAmount?: BoolWithAggregatesFilter<"InterestRate"> | boolean
    amountFrom?: StringNullableWithAggregatesFilter<"InterestRate"> | string | null
    amountTo?: StringNullableWithAggregatesFilter<"InterestRate"> | string | null
  }

  export type UserCreateInput = {
    roll_number: string
    password_hash: string
    role: string
    office_level: string
    full_name: string
    full_name_hindi?: string | null
    mobile?: string | null
    designation?: string | null
    designation_hindi?: string | null
    photo_url?: string | null
    is_head?: boolean
    is_deleted?: boolean
    must_change_password?: boolean
    linked_branch_code?: string | null
    linked_region_code?: string | null
    departments?: string | null
    history?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateInput = {
    id?: number
    roll_number: string
    password_hash: string
    role: string
    office_level: string
    full_name: string
    full_name_hindi?: string | null
    mobile?: string | null
    designation?: string | null
    designation_hindi?: string | null
    photo_url?: string | null
    is_head?: boolean
    is_deleted?: boolean
    must_change_password?: boolean
    linked_branch_code?: string | null
    linked_region_code?: string | null
    departments?: string | null
    history?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateInput = {
    roll_number?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    office_level?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    full_name_hindi?: NullableStringFieldUpdateOperationsInput | string | null
    mobile?: NullableStringFieldUpdateOperationsInput | string | null
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    designation_hindi?: NullableStringFieldUpdateOperationsInput | string | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_head?: BoolFieldUpdateOperationsInput | boolean
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    must_change_password?: BoolFieldUpdateOperationsInput | boolean
    linked_branch_code?: NullableStringFieldUpdateOperationsInput | string | null
    linked_region_code?: NullableStringFieldUpdateOperationsInput | string | null
    departments?: NullableStringFieldUpdateOperationsInput | string | null
    history?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    roll_number?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    office_level?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    full_name_hindi?: NullableStringFieldUpdateOperationsInput | string | null
    mobile?: NullableStringFieldUpdateOperationsInput | string | null
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    designation_hindi?: NullableStringFieldUpdateOperationsInput | string | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_head?: BoolFieldUpdateOperationsInput | boolean
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    must_change_password?: BoolFieldUpdateOperationsInput | boolean
    linked_branch_code?: NullableStringFieldUpdateOperationsInput | string | null
    linked_region_code?: NullableStringFieldUpdateOperationsInput | string | null
    departments?: NullableStringFieldUpdateOperationsInput | string | null
    history?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyInput = {
    id?: number
    roll_number: string
    password_hash: string
    role: string
    office_level: string
    full_name: string
    full_name_hindi?: string | null
    mobile?: string | null
    designation?: string | null
    designation_hindi?: string | null
    photo_url?: string | null
    is_head?: boolean
    is_deleted?: boolean
    must_change_password?: boolean
    linked_branch_code?: string | null
    linked_region_code?: string | null
    departments?: string | null
    history?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    roll_number?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    office_level?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    full_name_hindi?: NullableStringFieldUpdateOperationsInput | string | null
    mobile?: NullableStringFieldUpdateOperationsInput | string | null
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    designation_hindi?: NullableStringFieldUpdateOperationsInput | string | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_head?: BoolFieldUpdateOperationsInput | boolean
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    must_change_password?: BoolFieldUpdateOperationsInput | boolean
    linked_branch_code?: NullableStringFieldUpdateOperationsInput | string | null
    linked_region_code?: NullableStringFieldUpdateOperationsInput | string | null
    departments?: NullableStringFieldUpdateOperationsInput | string | null
    history?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    roll_number?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    office_level?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    full_name_hindi?: NullableStringFieldUpdateOperationsInput | string | null
    mobile?: NullableStringFieldUpdateOperationsInput | string | null
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    designation_hindi?: NullableStringFieldUpdateOperationsInput | string | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_head?: BoolFieldUpdateOperationsInput | boolean
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    must_change_password?: BoolFieldUpdateOperationsInput | boolean
    linked_branch_code?: NullableStringFieldUpdateOperationsInput | string | null
    linked_region_code?: NullableStringFieldUpdateOperationsInput | string | null
    departments?: NullableStringFieldUpdateOperationsInput | string | null
    history?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BranchCreateInput = {
    branch_code: string
    branch_name: string
    branch_type?: string | null
    category?: string | null
    region_code?: string | null
    state?: string | null
    district?: string | null
    taluk?: string | null
    revenue_centre?: string | null
    locality?: string | null
    latitude?: string | null
    longitude?: string | null
    pincode?: string | null
    is_deleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BranchUncheckedCreateInput = {
    id?: number
    branch_code: string
    branch_name: string
    branch_type?: string | null
    category?: string | null
    region_code?: string | null
    state?: string | null
    district?: string | null
    taluk?: string | null
    revenue_centre?: string | null
    locality?: string | null
    latitude?: string | null
    longitude?: string | null
    pincode?: string | null
    is_deleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BranchUpdateInput = {
    branch_code?: StringFieldUpdateOperationsInput | string
    branch_name?: StringFieldUpdateOperationsInput | string
    branch_type?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    region_code?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    taluk?: NullableStringFieldUpdateOperationsInput | string | null
    revenue_centre?: NullableStringFieldUpdateOperationsInput | string | null
    locality?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableStringFieldUpdateOperationsInput | string | null
    longitude?: NullableStringFieldUpdateOperationsInput | string | null
    pincode?: NullableStringFieldUpdateOperationsInput | string | null
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BranchUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    branch_code?: StringFieldUpdateOperationsInput | string
    branch_name?: StringFieldUpdateOperationsInput | string
    branch_type?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    region_code?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    taluk?: NullableStringFieldUpdateOperationsInput | string | null
    revenue_centre?: NullableStringFieldUpdateOperationsInput | string | null
    locality?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableStringFieldUpdateOperationsInput | string | null
    longitude?: NullableStringFieldUpdateOperationsInput | string | null
    pincode?: NullableStringFieldUpdateOperationsInput | string | null
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BranchCreateManyInput = {
    id?: number
    branch_code: string
    branch_name: string
    branch_type?: string | null
    category?: string | null
    region_code?: string | null
    state?: string | null
    district?: string | null
    taluk?: string | null
    revenue_centre?: string | null
    locality?: string | null
    latitude?: string | null
    longitude?: string | null
    pincode?: string | null
    is_deleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BranchUpdateManyMutationInput = {
    branch_code?: StringFieldUpdateOperationsInput | string
    branch_name?: StringFieldUpdateOperationsInput | string
    branch_type?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    region_code?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    taluk?: NullableStringFieldUpdateOperationsInput | string | null
    revenue_centre?: NullableStringFieldUpdateOperationsInput | string | null
    locality?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableStringFieldUpdateOperationsInput | string | null
    longitude?: NullableStringFieldUpdateOperationsInput | string | null
    pincode?: NullableStringFieldUpdateOperationsInput | string | null
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BranchUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    branch_code?: StringFieldUpdateOperationsInput | string
    branch_name?: StringFieldUpdateOperationsInput | string
    branch_type?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    region_code?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    taluk?: NullableStringFieldUpdateOperationsInput | string | null
    revenue_centre?: NullableStringFieldUpdateOperationsInput | string | null
    locality?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableStringFieldUpdateOperationsInput | string | null
    longitude?: NullableStringFieldUpdateOperationsInput | string | null
    pincode?: NullableStringFieldUpdateOperationsInput | string | null
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RegionCreateInput = {
    region_code: string
    region_name: string
    region_name_hindi?: string | null
    region_name_local?: string | null
    region_address?: string | null
    region_address_hindi?: string | null
    region_address_local?: string | null
    head_office_code?: string | null
    is_deleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RegionUncheckedCreateInput = {
    id?: number
    region_code: string
    region_name: string
    region_name_hindi?: string | null
    region_name_local?: string | null
    region_address?: string | null
    region_address_hindi?: string | null
    region_address_local?: string | null
    head_office_code?: string | null
    is_deleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RegionUpdateInput = {
    region_code?: StringFieldUpdateOperationsInput | string
    region_name?: StringFieldUpdateOperationsInput | string
    region_name_hindi?: NullableStringFieldUpdateOperationsInput | string | null
    region_name_local?: NullableStringFieldUpdateOperationsInput | string | null
    region_address?: NullableStringFieldUpdateOperationsInput | string | null
    region_address_hindi?: NullableStringFieldUpdateOperationsInput | string | null
    region_address_local?: NullableStringFieldUpdateOperationsInput | string | null
    head_office_code?: NullableStringFieldUpdateOperationsInput | string | null
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RegionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    region_code?: StringFieldUpdateOperationsInput | string
    region_name?: StringFieldUpdateOperationsInput | string
    region_name_hindi?: NullableStringFieldUpdateOperationsInput | string | null
    region_name_local?: NullableStringFieldUpdateOperationsInput | string | null
    region_address?: NullableStringFieldUpdateOperationsInput | string | null
    region_address_hindi?: NullableStringFieldUpdateOperationsInput | string | null
    region_address_local?: NullableStringFieldUpdateOperationsInput | string | null
    head_office_code?: NullableStringFieldUpdateOperationsInput | string | null
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RegionCreateManyInput = {
    id?: number
    region_code: string
    region_name: string
    region_name_hindi?: string | null
    region_name_local?: string | null
    region_address?: string | null
    region_address_hindi?: string | null
    region_address_local?: string | null
    head_office_code?: string | null
    is_deleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RegionUpdateManyMutationInput = {
    region_code?: StringFieldUpdateOperationsInput | string
    region_name?: StringFieldUpdateOperationsInput | string
    region_name_hindi?: NullableStringFieldUpdateOperationsInput | string | null
    region_name_local?: NullableStringFieldUpdateOperationsInput | string | null
    region_address?: NullableStringFieldUpdateOperationsInput | string | null
    region_address_hindi?: NullableStringFieldUpdateOperationsInput | string | null
    region_address_local?: NullableStringFieldUpdateOperationsInput | string | null
    head_office_code?: NullableStringFieldUpdateOperationsInput | string | null
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RegionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    region_code?: StringFieldUpdateOperationsInput | string
    region_name?: StringFieldUpdateOperationsInput | string
    region_name_hindi?: NullableStringFieldUpdateOperationsInput | string | null
    region_name_local?: NullableStringFieldUpdateOperationsInput | string | null
    region_address?: NullableStringFieldUpdateOperationsInput | string | null
    region_address_hindi?: NullableStringFieldUpdateOperationsInput | string | null
    region_address_local?: NullableStringFieldUpdateOperationsInput | string | null
    head_office_code?: NullableStringFieldUpdateOperationsInput | string | null
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DivisionCreateInput = {
    name: string
  }

  export type DivisionUncheckedCreateInput = {
    id?: number
    name: string
  }

  export type DivisionUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type DivisionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type DivisionCreateManyInput = {
    id?: number
    name: string
  }

  export type DivisionUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type DivisionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type DesignationCreateInput = {
    title: string
    workclass?: number
  }

  export type DesignationUncheckedCreateInput = {
    id?: number
    title: string
    workclass?: number
  }

  export type DesignationUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    workclass?: IntFieldUpdateOperationsInput | number
  }

  export type DesignationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    workclass?: IntFieldUpdateOperationsInput | number
  }

  export type DesignationCreateManyInput = {
    id?: number
    title: string
    workclass?: number
  }

  export type DesignationUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    workclass?: IntFieldUpdateOperationsInput | number
  }

  export type DesignationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    workclass?: IntFieldUpdateOperationsInput | number
  }

  export type CampaignCreateInput = {
    id?: string
    title: string
    description?: string | null
    department_code?: string | null
    startDate?: string | null
    endDate?: string | null
    type?: string | null
    unit?: string | null
    status?: string | null
    image?: string | null
    overall_target?: number | null
    data?: string | null
    achievement_entries?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CampaignUncheckedCreateInput = {
    id?: string
    title: string
    description?: string | null
    department_code?: string | null
    startDate?: string | null
    endDate?: string | null
    type?: string | null
    unit?: string | null
    status?: string | null
    image?: string | null
    overall_target?: number | null
    data?: string | null
    achievement_entries?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CampaignUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    department_code?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableStringFieldUpdateOperationsInput | string | null
    endDate?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    overall_target?: NullableFloatFieldUpdateOperationsInput | number | null
    data?: NullableStringFieldUpdateOperationsInput | string | null
    achievement_entries?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    department_code?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableStringFieldUpdateOperationsInput | string | null
    endDate?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    overall_target?: NullableFloatFieldUpdateOperationsInput | number | null
    data?: NullableStringFieldUpdateOperationsInput | string | null
    achievement_entries?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignCreateManyInput = {
    id?: string
    title: string
    description?: string | null
    department_code?: string | null
    startDate?: string | null
    endDate?: string | null
    type?: string | null
    unit?: string | null
    status?: string | null
    image?: string | null
    overall_target?: number | null
    data?: string | null
    achievement_entries?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CampaignUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    department_code?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableStringFieldUpdateOperationsInput | string | null
    endDate?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    overall_target?: NullableFloatFieldUpdateOperationsInput | number | null
    data?: NullableStringFieldUpdateOperationsInput | string | null
    achievement_entries?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    department_code?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableStringFieldUpdateOperationsInput | string | null
    endDate?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    overall_target?: NullableFloatFieldUpdateOperationsInput | number | null
    data?: NullableStringFieldUpdateOperationsInput | string | null
    achievement_entries?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentCreateInput = {
    id?: string
    category: string
    type: string
    subject: string
    content?: string | null
    refNo?: string | null
    status?: string
    formData?: string | null
    is_deleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DocumentUncheckedCreateInput = {
    id?: string
    category: string
    type: string
    subject: string
    content?: string | null
    refNo?: string | null
    status?: string
    formData?: string | null
    is_deleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DocumentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    refNo?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    formData?: NullableStringFieldUpdateOperationsInput | string | null
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    refNo?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    formData?: NullableStringFieldUpdateOperationsInput | string | null
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentCreateManyInput = {
    id?: string
    category: string
    type: string
    subject: string
    content?: string | null
    refNo?: string | null
    status?: string
    formData?: string | null
    is_deleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DocumentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    refNo?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    formData?: NullableStringFieldUpdateOperationsInput | string | null
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    refNo?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    formData?: NullableStringFieldUpdateOperationsInput | string | null
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BranchSurveyCreateInput = {
    refNo?: string | null
    region?: string | null
    applicationType?: string | null
    date?: string | null
    branch_name?: string | null
    formData?: string | null
    is_deleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BranchSurveyUncheckedCreateInput = {
    id?: number
    refNo?: string | null
    region?: string | null
    applicationType?: string | null
    date?: string | null
    branch_name?: string | null
    formData?: string | null
    is_deleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BranchSurveyUpdateInput = {
    refNo?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    applicationType?: NullableStringFieldUpdateOperationsInput | string | null
    date?: NullableStringFieldUpdateOperationsInput | string | null
    branch_name?: NullableStringFieldUpdateOperationsInput | string | null
    formData?: NullableStringFieldUpdateOperationsInput | string | null
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BranchSurveyUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    refNo?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    applicationType?: NullableStringFieldUpdateOperationsInput | string | null
    date?: NullableStringFieldUpdateOperationsInput | string | null
    branch_name?: NullableStringFieldUpdateOperationsInput | string | null
    formData?: NullableStringFieldUpdateOperationsInput | string | null
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BranchSurveyCreateManyInput = {
    id?: number
    refNo?: string | null
    region?: string | null
    applicationType?: string | null
    date?: string | null
    branch_name?: string | null
    formData?: string | null
    is_deleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BranchSurveyUpdateManyMutationInput = {
    refNo?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    applicationType?: NullableStringFieldUpdateOperationsInput | string | null
    date?: NullableStringFieldUpdateOperationsInput | string | null
    branch_name?: NullableStringFieldUpdateOperationsInput | string | null
    formData?: NullableStringFieldUpdateOperationsInput | string | null
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BranchSurveyUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    refNo?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    applicationType?: NullableStringFieldUpdateOperationsInput | string | null
    date?: NullableStringFieldUpdateOperationsInput | string | null
    branch_name?: NullableStringFieldUpdateOperationsInput | string | null
    formData?: NullableStringFieldUpdateOperationsInput | string | null
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BankConfigCreateInput = {
    id?: number
    name_english?: string | null
    name_hindi?: string | null
    name_local?: string | null
    dept_english?: string | null
    dept_hindi?: string | null
    dept_local?: string | null
  }

  export type BankConfigUncheckedCreateInput = {
    id?: number
    name_english?: string | null
    name_hindi?: string | null
    name_local?: string | null
    dept_english?: string | null
    dept_hindi?: string | null
    dept_local?: string | null
  }

  export type BankConfigUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name_english?: NullableStringFieldUpdateOperationsInput | string | null
    name_hindi?: NullableStringFieldUpdateOperationsInput | string | null
    name_local?: NullableStringFieldUpdateOperationsInput | string | null
    dept_english?: NullableStringFieldUpdateOperationsInput | string | null
    dept_hindi?: NullableStringFieldUpdateOperationsInput | string | null
    dept_local?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BankConfigUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name_english?: NullableStringFieldUpdateOperationsInput | string | null
    name_hindi?: NullableStringFieldUpdateOperationsInput | string | null
    name_local?: NullableStringFieldUpdateOperationsInput | string | null
    dept_english?: NullableStringFieldUpdateOperationsInput | string | null
    dept_hindi?: NullableStringFieldUpdateOperationsInput | string | null
    dept_local?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BankConfigCreateManyInput = {
    id?: number
    name_english?: string | null
    name_hindi?: string | null
    name_local?: string | null
    dept_english?: string | null
    dept_hindi?: string | null
    dept_local?: string | null
  }

  export type BankConfigUpdateManyMutationInput = {
    id?: IntFieldUpdateOperationsInput | number
    name_english?: NullableStringFieldUpdateOperationsInput | string | null
    name_hindi?: NullableStringFieldUpdateOperationsInput | string | null
    name_local?: NullableStringFieldUpdateOperationsInput | string | null
    dept_english?: NullableStringFieldUpdateOperationsInput | string | null
    dept_hindi?: NullableStringFieldUpdateOperationsInput | string | null
    dept_local?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BankConfigUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name_english?: NullableStringFieldUpdateOperationsInput | string | null
    name_hindi?: NullableStringFieldUpdateOperationsInput | string | null
    name_local?: NullableStringFieldUpdateOperationsInput | string | null
    dept_english?: NullableStringFieldUpdateOperationsInput | string | null
    dept_hindi?: NullableStringFieldUpdateOperationsInput | string | null
    dept_local?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InterestRateCreateInput = {
    type: string
    product: string
    effectiveDate: string
    rate: string
    circular?: string | null
    isAnyAmount?: boolean
    amountFrom?: string | null
    amountTo?: string | null
  }

  export type InterestRateUncheckedCreateInput = {
    id?: number
    type: string
    product: string
    effectiveDate: string
    rate: string
    circular?: string | null
    isAnyAmount?: boolean
    amountFrom?: string | null
    amountTo?: string | null
  }

  export type InterestRateUpdateInput = {
    type?: StringFieldUpdateOperationsInput | string
    product?: StringFieldUpdateOperationsInput | string
    effectiveDate?: StringFieldUpdateOperationsInput | string
    rate?: StringFieldUpdateOperationsInput | string
    circular?: NullableStringFieldUpdateOperationsInput | string | null
    isAnyAmount?: BoolFieldUpdateOperationsInput | boolean
    amountFrom?: NullableStringFieldUpdateOperationsInput | string | null
    amountTo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InterestRateUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    product?: StringFieldUpdateOperationsInput | string
    effectiveDate?: StringFieldUpdateOperationsInput | string
    rate?: StringFieldUpdateOperationsInput | string
    circular?: NullableStringFieldUpdateOperationsInput | string | null
    isAnyAmount?: BoolFieldUpdateOperationsInput | boolean
    amountFrom?: NullableStringFieldUpdateOperationsInput | string | null
    amountTo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InterestRateCreateManyInput = {
    id?: number
    type: string
    product: string
    effectiveDate: string
    rate: string
    circular?: string | null
    isAnyAmount?: boolean
    amountFrom?: string | null
    amountTo?: string | null
  }

  export type InterestRateUpdateManyMutationInput = {
    type?: StringFieldUpdateOperationsInput | string
    product?: StringFieldUpdateOperationsInput | string
    effectiveDate?: StringFieldUpdateOperationsInput | string
    rate?: StringFieldUpdateOperationsInput | string
    circular?: NullableStringFieldUpdateOperationsInput | string | null
    isAnyAmount?: BoolFieldUpdateOperationsInput | boolean
    amountFrom?: NullableStringFieldUpdateOperationsInput | string | null
    amountTo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InterestRateUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    product?: StringFieldUpdateOperationsInput | string
    effectiveDate?: StringFieldUpdateOperationsInput | string
    rate?: StringFieldUpdateOperationsInput | string
    circular?: NullableStringFieldUpdateOperationsInput | string | null
    isAnyAmount?: BoolFieldUpdateOperationsInput | boolean
    amountFrom?: NullableStringFieldUpdateOperationsInput | string | null
    amountTo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    roll_number?: SortOrder
    password_hash?: SortOrder
    role?: SortOrder
    office_level?: SortOrder
    full_name?: SortOrder
    full_name_hindi?: SortOrder
    mobile?: SortOrder
    designation?: SortOrder
    designation_hindi?: SortOrder
    photo_url?: SortOrder
    is_head?: SortOrder
    is_deleted?: SortOrder
    must_change_password?: SortOrder
    linked_branch_code?: SortOrder
    linked_region_code?: SortOrder
    departments?: SortOrder
    history?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    roll_number?: SortOrder
    password_hash?: SortOrder
    role?: SortOrder
    office_level?: SortOrder
    full_name?: SortOrder
    full_name_hindi?: SortOrder
    mobile?: SortOrder
    designation?: SortOrder
    designation_hindi?: SortOrder
    photo_url?: SortOrder
    is_head?: SortOrder
    is_deleted?: SortOrder
    must_change_password?: SortOrder
    linked_branch_code?: SortOrder
    linked_region_code?: SortOrder
    departments?: SortOrder
    history?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    roll_number?: SortOrder
    password_hash?: SortOrder
    role?: SortOrder
    office_level?: SortOrder
    full_name?: SortOrder
    full_name_hindi?: SortOrder
    mobile?: SortOrder
    designation?: SortOrder
    designation_hindi?: SortOrder
    photo_url?: SortOrder
    is_head?: SortOrder
    is_deleted?: SortOrder
    must_change_password?: SortOrder
    linked_branch_code?: SortOrder
    linked_region_code?: SortOrder
    departments?: SortOrder
    history?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BranchCountOrderByAggregateInput = {
    id?: SortOrder
    branch_code?: SortOrder
    branch_name?: SortOrder
    branch_type?: SortOrder
    category?: SortOrder
    region_code?: SortOrder
    state?: SortOrder
    district?: SortOrder
    taluk?: SortOrder
    revenue_centre?: SortOrder
    locality?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    pincode?: SortOrder
    is_deleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BranchAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type BranchMaxOrderByAggregateInput = {
    id?: SortOrder
    branch_code?: SortOrder
    branch_name?: SortOrder
    branch_type?: SortOrder
    category?: SortOrder
    region_code?: SortOrder
    state?: SortOrder
    district?: SortOrder
    taluk?: SortOrder
    revenue_centre?: SortOrder
    locality?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    pincode?: SortOrder
    is_deleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BranchMinOrderByAggregateInput = {
    id?: SortOrder
    branch_code?: SortOrder
    branch_name?: SortOrder
    branch_type?: SortOrder
    category?: SortOrder
    region_code?: SortOrder
    state?: SortOrder
    district?: SortOrder
    taluk?: SortOrder
    revenue_centre?: SortOrder
    locality?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    pincode?: SortOrder
    is_deleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BranchSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type RegionCountOrderByAggregateInput = {
    id?: SortOrder
    region_code?: SortOrder
    region_name?: SortOrder
    region_name_hindi?: SortOrder
    region_name_local?: SortOrder
    region_address?: SortOrder
    region_address_hindi?: SortOrder
    region_address_local?: SortOrder
    head_office_code?: SortOrder
    is_deleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RegionAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type RegionMaxOrderByAggregateInput = {
    id?: SortOrder
    region_code?: SortOrder
    region_name?: SortOrder
    region_name_hindi?: SortOrder
    region_name_local?: SortOrder
    region_address?: SortOrder
    region_address_hindi?: SortOrder
    region_address_local?: SortOrder
    head_office_code?: SortOrder
    is_deleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RegionMinOrderByAggregateInput = {
    id?: SortOrder
    region_code?: SortOrder
    region_name?: SortOrder
    region_name_hindi?: SortOrder
    region_name_local?: SortOrder
    region_address?: SortOrder
    region_address_hindi?: SortOrder
    region_address_local?: SortOrder
    head_office_code?: SortOrder
    is_deleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RegionSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type DivisionCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type DivisionAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type DivisionMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type DivisionMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type DivisionSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type DesignationCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    workclass?: SortOrder
  }

  export type DesignationAvgOrderByAggregateInput = {
    id?: SortOrder
    workclass?: SortOrder
  }

  export type DesignationMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    workclass?: SortOrder
  }

  export type DesignationMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    workclass?: SortOrder
  }

  export type DesignationSumOrderByAggregateInput = {
    id?: SortOrder
    workclass?: SortOrder
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type CampaignCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    department_code?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    type?: SortOrder
    unit?: SortOrder
    status?: SortOrder
    image?: SortOrder
    overall_target?: SortOrder
    data?: SortOrder
    achievement_entries?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CampaignAvgOrderByAggregateInput = {
    overall_target?: SortOrder
  }

  export type CampaignMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    department_code?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    type?: SortOrder
    unit?: SortOrder
    status?: SortOrder
    image?: SortOrder
    overall_target?: SortOrder
    data?: SortOrder
    achievement_entries?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CampaignMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    department_code?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    type?: SortOrder
    unit?: SortOrder
    status?: SortOrder
    image?: SortOrder
    overall_target?: SortOrder
    data?: SortOrder
    achievement_entries?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CampaignSumOrderByAggregateInput = {
    overall_target?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type DocumentCountOrderByAggregateInput = {
    id?: SortOrder
    category?: SortOrder
    type?: SortOrder
    subject?: SortOrder
    content?: SortOrder
    refNo?: SortOrder
    status?: SortOrder
    formData?: SortOrder
    is_deleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DocumentMaxOrderByAggregateInput = {
    id?: SortOrder
    category?: SortOrder
    type?: SortOrder
    subject?: SortOrder
    content?: SortOrder
    refNo?: SortOrder
    status?: SortOrder
    formData?: SortOrder
    is_deleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DocumentMinOrderByAggregateInput = {
    id?: SortOrder
    category?: SortOrder
    type?: SortOrder
    subject?: SortOrder
    content?: SortOrder
    refNo?: SortOrder
    status?: SortOrder
    formData?: SortOrder
    is_deleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BranchSurveyCountOrderByAggregateInput = {
    id?: SortOrder
    refNo?: SortOrder
    region?: SortOrder
    applicationType?: SortOrder
    date?: SortOrder
    branch_name?: SortOrder
    formData?: SortOrder
    is_deleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BranchSurveyAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type BranchSurveyMaxOrderByAggregateInput = {
    id?: SortOrder
    refNo?: SortOrder
    region?: SortOrder
    applicationType?: SortOrder
    date?: SortOrder
    branch_name?: SortOrder
    formData?: SortOrder
    is_deleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BranchSurveyMinOrderByAggregateInput = {
    id?: SortOrder
    refNo?: SortOrder
    region?: SortOrder
    applicationType?: SortOrder
    date?: SortOrder
    branch_name?: SortOrder
    formData?: SortOrder
    is_deleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BranchSurveySumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type BankConfigCountOrderByAggregateInput = {
    id?: SortOrder
    name_english?: SortOrder
    name_hindi?: SortOrder
    name_local?: SortOrder
    dept_english?: SortOrder
    dept_hindi?: SortOrder
    dept_local?: SortOrder
  }

  export type BankConfigAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type BankConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    name_english?: SortOrder
    name_hindi?: SortOrder
    name_local?: SortOrder
    dept_english?: SortOrder
    dept_hindi?: SortOrder
    dept_local?: SortOrder
  }

  export type BankConfigMinOrderByAggregateInput = {
    id?: SortOrder
    name_english?: SortOrder
    name_hindi?: SortOrder
    name_local?: SortOrder
    dept_english?: SortOrder
    dept_hindi?: SortOrder
    dept_local?: SortOrder
  }

  export type BankConfigSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type InterestRateCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    product?: SortOrder
    effectiveDate?: SortOrder
    rate?: SortOrder
    circular?: SortOrder
    isAnyAmount?: SortOrder
    amountFrom?: SortOrder
    amountTo?: SortOrder
  }

  export type InterestRateAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type InterestRateMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    product?: SortOrder
    effectiveDate?: SortOrder
    rate?: SortOrder
    circular?: SortOrder
    isAnyAmount?: SortOrder
    amountFrom?: SortOrder
    amountTo?: SortOrder
  }

  export type InterestRateMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    product?: SortOrder
    effectiveDate?: SortOrder
    rate?: SortOrder
    circular?: SortOrder
    isAnyAmount?: SortOrder
    amountFrom?: SortOrder
    amountTo?: SortOrder
  }

  export type InterestRateSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}