function validateRequestBody(body) {
  const { username, email } = body;
  let errors = [];
  if (!username || typeof username !== "string") {
    errors.push("Username is required and should be a string.");
  }
  if (!email || typeof email !== "string") {
    errors.push("Email is required and should be a string.");
  }
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (email && !emailRegex.test(email)) {
    errors.push("Invalid email format.");
  }
  return errors;
}
function validateSearchImageQuery(query) {
  const errors = [];
  if (!query || typeof query !== "string") {
    errors.push("Query parameter is required and should be a string.");
  }
  return errors;
}
function validatePhotos(body) {
  let errors = [];
  const { imageUrl, tags } = body;
  if (imageUrl && !imageUrl.startsWith("https://images.unsplash.com/")) {
    errors.push("Invaldi unsplash image URL");
  }
  if (tags && tags.length > 5) {
    errors.push("Tags exceeded the maximum length(5)");
  }
  for (let i = 0; i < tags.length; i++) {
    let element = tags[i];
    if (element.length > 20) {
      errors.push("Tag element exceeded the maximum length(20");
      break;
    }
  }
  return errors;
}
function validateTags(tags) {
  let errors = [];
  for (let i = 0; i < tags.length; i++) {
    let tagName = tags[i];
    if (!tagName || typeof tagName !== "string" || tagName.length === 0) {
      errors.push("Tags must be non-empty strings.");
      break;
    }
  }

  return errors;
}

function validateSearchTagQuery(tag, sort) {
  const errors = [];
  if (!tag || typeof tag !== "string") {
    errors.push("A valid tag must be provided as a query parameter.");
  }
  if (sort && !["ASC", "DESC"].includes(sort.toUpperCase())) {
    errors.push("Sort order must be either 'ASC' or 'DESC'.");
  }
  return errors;
}

module.exports = {
  validateRequestBody,
  validateSearchImageQuery,
  validatePhotos,
  validateTags,
  validateSearchTagQuery,
};
