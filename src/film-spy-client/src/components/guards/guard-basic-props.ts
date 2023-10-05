import type { ChildrenProps } from 'props';

type GuardBasicProps = ChildrenProps & {
  isEnabled?: boolean,
  navigateOnForbidden?: string,
};

export default GuardBasicProps;
