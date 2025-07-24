const paths = {
  home: () => '/',
  topicView: (topicSlug: string) => `/topics/${topicSlug}`,
  postView: (topicSlug: string, postId: string) =>
    `/topics/${topicSlug}/posts/${postId}`,
};

export default paths;
