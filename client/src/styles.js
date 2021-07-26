import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    appBar: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      heading: {
        color: 'rgb(63,81,181)',
      },
      image: {
        marginLeft: '15px',
      },
      [theme.breakpoints.down('sm')]:{//media query in material ui
        mainContainer: {
          flexDirection: "column-reverse",
        },
      }
}));