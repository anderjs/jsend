export type CardProps = {
  requirement?: string;
  description?: string;
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  state?: number;
};

export type CardTitleProps = {
  title?: "Pendientes de Carga" | "Pendientes de Validación" | "Validados";
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
};