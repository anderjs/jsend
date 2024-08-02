import { map } from "lodash";

type Mapping<T> = {
  idAsKey: keyof T;
  labelAsKey: keyof T;
  valueAsKey: keyof T;
  valueAsHref?: keyof T;
};

type Option = {
  to?: string;
  key: string;
  label: string;
  value: string;
};

/**
 * @description
 * Maps data to be used in select component.
 * @param data - data to be mapped.
 * @param args - mapping arguments.
 */
export function mapping<T>(data: T[], args: Mapping<T>) {
  return map(data, (value: T) => {
    return {
      to: args.valueAsHref ? value[args.valueAsHref] : null,
      key: value[args.idAsKey],
      label: value[args.labelAsKey],
      value: value[args.valueAsKey],
    };
  }) as Option [];
}