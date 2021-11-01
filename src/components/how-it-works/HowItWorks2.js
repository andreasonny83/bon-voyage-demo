import React from 'react';
import { makeStyles, alpha } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import ApartmentIcon from '@material-ui/icons/Apartment';
import DnsIcon from '@material-ui/icons/Dns';
import TapAndPlayIcon from '@material-ui/icons/TapAndPlay';

<<<<<<< HEAD



const useStyles = makeStyles((theme) => ({
  iconWrapper: {
    backgroundColor: alpha(theme.palette.background.emphasis, .6),
  },
  img: {
    maxWidth: '100%'
  }
=======
const useStyles = makeStyles((theme) => ({
  iconWrapper: {
    backgroundColor: alpha(theme.palette.background.emphasis, 0.6),
  },
  img: {
    maxWidth: '100%',
  },
>>>>>>> 7cd3a1017f5ba53840cd95b60c48b65ed25f6df6
}));

export default function HowItWorks(props) {
  const classes = useStyles();

  const content = {
<<<<<<< HEAD
    'badge': 'LOREM IPSUM',
    'header-p1': 'Lorem ipsum dolor',
    'header-p2': 'sit amet consectetur.',
    'description': 'Suspendisse aliquam tellus ante, porttitor mattis diam eleifend quis. Pellentesque pulvinar commodo eros sit amet finibus. Aenean et ornare erat.',
    'col1-header': 'Lorem ipsum dolor sit amet',
    'col2-header': 'Donec ut orci justo',
    'col3-header': 'Duis vitae sem turpis',
    'image': 'nereus-assets/img/illustrations/financial-report.svg',
    ...props.content
=======
    badge: 'LOREM IPSUM',
    'header-p1': 'Lorem ipsum dolor',
    'header-p2': 'sit amet consectetur.',
    description:
      'Suspendisse aliquam tellus ante, porttitor mattis diam eleifend quis. Pellentesque pulvinar commodo eros sit amet finibus. Aenean et ornare erat.',
    'col1-header': 'Lorem ipsum dolor sit amet',
    'col2-header': 'Donec ut orci justo',
    'col3-header': 'Duis vitae sem turpis',
    image: 'nereus-assets/img/illustrations/financial-report.svg',
    ...props.content,
>>>>>>> 7cd3a1017f5ba53840cd95b60c48b65ed25f6df6
  };

  return (
    <section>
      <Container maxWidth="lg">
        <Box py={10}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Box>
<<<<<<< HEAD
                <Typography variant="overline" color="textSecondary">{content['badge']}</Typography>
                <Typography variant="h3" component="h2" gutterBottom={true}>
                  <Typography color="primary" variant="h3" component="span">{content['header-p1']} </Typography>
                  <Typography variant="h3" component="span">{content['header-p2']}</Typography>
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" paragraph={true}>{content['description']}</Typography>
=======
                <Typography variant="overline" color="textSecondary">
                  {content['badge']}
                </Typography>
                <Typography variant="h3" component="h2" gutterBottom={true}>
                  <Typography color="primary" variant="h3" component="span">
                    {content['header-p1']}{' '}
                  </Typography>
                  <Typography variant="h3" component="span">
                    {content['header-p2']}
                  </Typography>
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" paragraph={true}>
                  {content['description']}
                </Typography>
>>>>>>> 7cd3a1017f5ba53840cd95b60c48b65ed25f6df6
                <div>
                  <Box mt={3} mb={2} display="flex" alignItems="center">
                    <Box pr={2}>
                      <Avatar className={classes.iconWrapper} variant="rounded">
                        <ApartmentIcon color="primary" />
                      </Avatar>
                    </Box>
<<<<<<< HEAD
                    <Typography variant="h6" component="h3" gutterBottom={true}>{content['col1-header']}</Typography>
=======
                    <Typography variant="h6" component="h3" gutterBottom={true}>
                      {content['col1-header']}
                    </Typography>
>>>>>>> 7cd3a1017f5ba53840cd95b60c48b65ed25f6df6
                  </Box>
                  <Box mb={2} display="flex" alignItems="center">
                    <Box pr={2}>
                      <Avatar className={classes.iconWrapper} variant="rounded">
                        <DnsIcon color="primary" />
                      </Avatar>
                    </Box>
<<<<<<< HEAD
                    <Typography variant="h6" component="h3" gutterBottom={true}>{content['col2-header']}</Typography>
=======
                    <Typography variant="h6" component="h3" gutterBottom={true}>
                      {content['col2-header']}
                    </Typography>
>>>>>>> 7cd3a1017f5ba53840cd95b60c48b65ed25f6df6
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Box pr={2}>
                      <Avatar className={classes.iconWrapper} variant="rounded">
                        <TapAndPlayIcon color="primary" />
                      </Avatar>
                    </Box>
<<<<<<< HEAD
                    <Typography variant="h6" component="h3" gutterBottom={true}>{content['col3-header']}</Typography>
=======
                    <Typography variant="h6" component="h3" gutterBottom={true}>
                      {content['col3-header']}
                    </Typography>
>>>>>>> 7cd3a1017f5ba53840cd95b60c48b65ed25f6df6
                  </Box>
                </div>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
<<<<<<< HEAD
                <img src={content['image']} alt="" className={classes.img} />
=======
              <img src={content['image']} alt="" className={classes.img} />
>>>>>>> 7cd3a1017f5ba53840cd95b60c48b65ed25f6df6
            </Grid>
          </Grid>
        </Box>
      </Container>
    </section>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 7cd3a1017f5ba53840cd95b60c48b65ed25f6df6
