export async function getImages(q, page) {
  const url = new URL('https://pixabay.com/api/');
  url.searchParams.set('q', q);
  url.searchParams.set('page', page);
  url.searchParams.set('key', '28092869-c096b2e9e8db9cb91be15289b');
  url.searchParams.set('image_type', 'photo');
  url.searchParams.set('orientation', 'horizontal');
  url.searchParams.set('per_page', '12');

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return new Promise.rejected("Resourse don't found");
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    return new Promise.rejected('Something went wrong');
  }
}
