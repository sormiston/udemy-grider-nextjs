const paths = {
  home: () => '/',
  topicView: (topicSlug: string) => `/topics/${topicSlug}`,
  postCreate: (topicSlug: string) => `/topics/${topicSlug}/posts/new`,
  postView: (topicSlug: string, postId: string) =>
    `/topics/${topicSlug}/posts/${postId}`,
};

export default paths;
