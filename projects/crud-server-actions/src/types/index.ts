export type UpdateDTO<T extends { id: unknown }> = Omit<Partial<T>, "id"> & {
  id: T["id"];
};

// TODO: add DTOs for other CRUD operations?