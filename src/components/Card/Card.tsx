import classNames from "classnames/bind";
import classes from "./Card.module.scss";
import { TitleLayout } from "../TitleLayout/TitleLayout";

type CardProps = {
  title?: string;
  children: React.ReactNode;
  headerAction?: React.ReactNode;
  showHeader?: boolean;
  full?: boolean;
  style?: any;
  bodyStyle?: any;
  testId?: string;
};

const Card = ({
  title,
  children,
  headerAction,
  showHeader = true,
  full,
  style,
  bodyStyle,
  testId,
}: CardProps): React.ReactElement => {
  const cx = classNames.bind(classes);

  return (
    <div className={cx("card", { full })} style={style} data-testid={testId}>
      {showHeader && (
        <div className={cx(classes.header)}>
          <TitleLayout text={title} />
          {headerAction ? headerAction : undefined}
        </div>
      )}
      <div className={cx(classes.body)} style={bodyStyle}>
        {children}
      </div>
    </div>
  );
};

export { Card };
