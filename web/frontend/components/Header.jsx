import {
  Avatar,
  Card,
  DisplayText,
  Heading,
  Image,
  Stack,
  TextStyle,
  TextField,
  Icon,
  Button,
  List,
  Link,
} from '@shopify/polaris';
import {
  ChevronDownMinor,
  SearchMinor,
  ProfileMajor,
} from '@shopify/polaris-icons';
import {
  announceIcon,
  logoImage,
  headerstyle,
  creditIcon,
  notification,
} from '../assets';

export function Header() {
  const searchIcon = <Icon source={SearchMinor} />;
  return (
    <>
      <Card sectioned subdued>
        <Stack vertical spacing="loose">
          <Stack distribution="equalSpacing">
            <Stack spacing="loose">
              <Image source={logoImage} />
              <TextField
                suffix={searchIcon}
                inputMode="text"
                placeholder="Search packs"
              />
            </Stack>
            <Stack alignment="center" spacing="loose">
              <Button primary>+ Add New Pack</Button>
              <Image source={announceIcon} height={14} />
              <Image source={notification} height={14} />
              <Stack alignment="center" spacing="tight">
                <Avatar customer name="Farrah" />
                <Icon source={ChevronDownMinor} />
              </Stack>
            </Stack>
          </Stack>
          <Stack distribution="equalSpacing">
            <Stack spacing="loose">
              <ul className="menu-list">
                <li className="menu-item">
                  <a>Explore</a>
                  <span className="underline"></span>
                </li>
                <li className="menu-item">
                  <a>Samples</a>
                  <span className="underline"></span>
                </li>
                <li className="menu-item">
                  <a>Packs</a>
                  <span className="underline"></span>
                </li>
                <li className="menu-item">
                  <a>Selections</a>
                  <span className="underline"></span>
                </li>
                <li className="menu-item">
                  <a>Creators</a>
                  <span className="underline"></span>
                </li>
                <li className="menu-item">
                  <a>Mix</a>
                  <span className="underline"></span>
                </li>
              </ul>
            </Stack>
            <Stack>
              <ul className="menu-list">
                <li className="menu-item">
                  <a>My Account</a>
                  <span className="underline"></span>
                </li>
                <li className="menu-item credit-icon">
                  <Stack spacing="tight">
                    <a>0 credits</a>
                    <Image source={creditIcon} />
                  </Stack>
                  <span className="underline"></span>
                </li>
                <li className="menu-item">
                  <a>Downloads</a>
                  <span className="underline"></span>
                </li>
                <li className="menu-item">
                  <a>Links</a>
                  <span className="underline"></span>
                </li>
              </ul>
            </Stack>
          </Stack>
        </Stack>
      </Card>
    </>
  );
}
