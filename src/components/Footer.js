import { createStyles, Container, Group, ActionIcon } from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
} from "@tabler/icons";
import { MantineLogo } from "@mantine/ds";
import FooterImage from "../assets/footer.png";

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 120,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      marginTop: theme.spacing.md,
    },
  },
}));

export function FooterSocial() {
  const { classes } = useStyles();

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <img className="footerlogo" src={FooterImage} alt="navbar-home" />
        <Group spacing={10} className={classes.links} position="right" noWrap>
          <ActionIcon size="lg">
            <IconBrandTwitter size={35} stroke={2} />
          </ActionIcon>
          <ActionIcon size="lg">
            <IconBrandYoutube size={35} stroke={2} />
          </ActionIcon>
          <ActionIcon size="lg">
            <IconBrandInstagram size={35} stroke={2} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
}

export default FooterSocial;
