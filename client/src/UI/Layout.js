import classes from "./Layout.module.css";

function Layout(props) {
  return (
    <div>
      <main className={classes.left}>{props.children}</main>
    </div>
  );
}

export default Layout;
