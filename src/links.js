
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
import StorefrontIcon from '@mui/icons-material/Storefront';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import GitHubIcon from '@mui/icons-material/GitHub';
import DiscordIcon from 'app/icons/DiscordIcon';
import MediumIcon from 'app/icons/MediumIcon';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
import RedditIcon from '@mui/icons-material/Reddit';
import YouTubeIcon from '@mui/icons-material/YouTube';

// services
export const WebWallet = {
  href: 'https://chromewebstore.google.com/detail/mochimo-wallet/fkogefgjocnflhankmffnibdofdiiiho',
  Icon: WalletIcon,
  secondary: 'Chromium Wallet',
  primary: 'Mochimo Web Wallet'
};
export const Merchandise = {
  href: 'https://my-store-b9cfd9.creator-spring.com',
  Icon: StorefrontIcon,
  secondary: 'Mochimo Apparel',
  primary: 'Merchandise'
};
export const Status = {
  href: 'https://status.mochimo.org',
  Icon: OnlinePredictionIcon,
  secondary: 'Status / Uptime Monitor',
  primary: 'Live System Status'
};

// social links
export const Discord = {
  href: 'https://discord.mochimo.org/',
  Icon: DiscordIcon,
  primary: 'Discord'
};
export const Github = {
  href: 'https://github.com/mochimodev',
  Icon: GitHubIcon,
  primary: 'Github'
};
export const Medium = {
  href: 'https://medium.com/mochimo-official',
  Icon: MediumIcon,
  primary: 'Medium'
};
export const Reddit = {
  href: 'https://www.reddit.com/r/mochimo/',
  Icon: RedditIcon,
  primary: 'Reddit'
};
export const Telegram = {
  href: 'https://t.me/mochimocryptochat',
  Icon: TelegramIcon,
  primary: 'Telegram'
};
export const Twitter = {
  href: 'https://twitter.com/mochimocrypto',
  Icon: TwitterIcon,
  primary: 'Twitter'
};
export const YouTube = {
  href: 'https://www.youtube.com/channel/UCFW0_JZR32gMvEtJQ3YE0KA',
  Icon: YouTubeIcon,
  primary: 'YouTube'
};

// tl exports
export const service = [Status];
export const social = [Discord, Medium, Reddit, Telegram, Twitter, YouTube];
const Links = { service, social };

export default Links;
