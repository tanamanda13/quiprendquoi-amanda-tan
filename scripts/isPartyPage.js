export default function isPartyPage(url) {
  return /party\/[a-zA-Z0-9]*$/.test(url);
}