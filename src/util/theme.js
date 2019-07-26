export default {
    palette: {
      primary: {
        light: '#7c42bd',
        main: '#4a138c',
        dark: '#12005e',
        contrastText: '#fff'
      },
      secondary: {
        light: '#ffd149',
        main: '#ffa000',
        dark: '#c67100',
        contrastText: '#000'
      },
    },
    typography: {
      useNextVariants: true
    },
    customStyles: {
      //Yap Dialog
      invisibleSeparator : {
        border: 'none',
        margin: 4
      },
      visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20
      },
      profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
      },
      closeButton: {
        position: 'absolute',
        left: '90%'
      },
      expandButton: {
        position: 'absolute',
        left: '90%'
      },
      spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
      },
      //Yap
      card: {
        position: 'relative',
        display: 'flex',
        marginBottom:20
      },
      image:{
        minWidth:200,
        objectFit: 'cover'
      },
      content: {
        padding:25,
        objectFit: 'cover'
      },
      //Comments
      commentImage: {
        maxWidth: '100%',
        height: 100,
        objectFit: 'cover',
        borderRadius:'50%'
      },
      commentData: {
        marginLeft: 20
      }
    }
  }