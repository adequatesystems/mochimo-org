
export default function TimePrep ({ epoch }) {
  const date = new Date(epoch);
  const localeString = date.toLocaleString(undefined,
    {dateStyle: 'long', timeStyle: 'long'});
  // return TimeLocale JSX in a span
  return (
    <span title={date.toUTCString()}>{localeString}</span>
  );
}
