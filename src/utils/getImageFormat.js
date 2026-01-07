


const getImageFormat = (image, format) => {
  return image?.formats?.[format]?.url ?? image?.url
}

export default getImageFormat