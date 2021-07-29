export const formatDate = (timeString: string | null | undefined): string => {
  if (!timeString) {
    return '-';
  }

  try {
    const date = new Date(timeString);
    const dateString = date.toDateString();

    return `${dateString.split(' ').slice(1).join('-')}`;
  } catch (e) {}

  return timeString;
};
