const customPalette = {
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
}

export default {
    palette: customPalette,
    typography: {
      useNextVariants: true
    },
    customStyles: {
      //Profile Skeleton
      handleProfileSkeleton: {
        width:60,
        height:18,
        backgroundColor: customPalette.primary.main,
        margin: ' 0 auto 7px auto'
      },
      //Yap Skeleton
      cardSkeleton: {
        display: 'flex',
        marginBottom:20
      },
      cardContentSkeleton: {
        width: '100%',
        flexDirection: 'column',
        padding: 25
      },
      coverSkeleton: {
        minWidth:200,
        objectFit: 'cover'
      },
      handleSkeleton: {
        width:60,
        height:18,
        backgroundColor: customPalette.primary.main,
        marginBottom: 7
      },
      dateSkeleton: {
        height:14,
        width:100,
        marginBottom: 10,
        backgroundColor: 'rgba(0,0,0, 0.3)'
      },
      fullLineSkeleton:{
        height: 15,
        width: '90%',
        marginBottom: 10,
        backgroundColor: 'rgba(0,0,0, 0.5)'
      },
      halfLineSkeleton: {
        height: 15,
        width: '45%',
        marginBottom: 10,
        backgroundColor: 'rgba(0,0,0, 0.5)'
      },
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
      },
      //Profile and Static Profile
      paper: {
          padding: 20
      },
      profile: {
        '& .image-wrapper': {
          textAlign: 'center',
          position: 'relative',
          '& button': {
            position: 'absolute',
            top: '80%',
            left: '70%'
          }
        },
        '& .profile-image': {
          width: 200,
          height: 200,
          objectFit: 'cover',
          maxWidth: '100%',
          borderRadius: '50%'
        },
        '& .profile-details': {
          textAlign: 'center',
          '& span, svg': {
            verticalAlign: 'middle'
          },
          '& a': {
            color: customPalette.primary.main
          }
        },
        '& hr': {
          border: 'none',
          margin: '0 0 10px 0'
        },
        '& svg.button': {
          '&:hover': {
            cursor: 'pointer'
          }
        }
      },
      buttons: {
        textAlign: 'center',
        '& a': {
          margin: '20px 10px'
        }
      }
    }
  }