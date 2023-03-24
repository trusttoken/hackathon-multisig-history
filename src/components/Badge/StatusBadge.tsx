import { Badge } from "./Badge";

interface Props {
  confirmationsRequired: number;
  confirmationsGets: number;
}

export const StatusBadge = ({
  confirmationsRequired,
  confirmationsGets,
}: Props) =>
  confirmationsRequired === confirmationsGets ? (
    <Badge color="green">Ready</Badge>
  ) : (
    <Badge color="orange">Pending</Badge>
  );
