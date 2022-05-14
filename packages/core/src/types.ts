export type TupleToUnion<T> = T extends Array<infer ITEMS> ? ITEMS : never;

export type MapBy<T extends any[] | any[] | undefined, FIELD extends keyof TupleToUnion<T>> = {
  [key in TupleToUnion<T>[FIELD]]: Extract<TupleToUnion<T>, { [exc in FIELD]: key }>;
};
