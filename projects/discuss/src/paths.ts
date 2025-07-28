const paths = {
  home: () => '/',
  topicView: (topicSlug: string) => `/topics/${topicSlug}`,
  postView: (topicSlug: string, postId: string) =>
    `/topics/${topicSlug}/posts/${postId}`,
  search: (searchTerm: string) => `/search?term=${searchTerm}`,
};

export default paths;
