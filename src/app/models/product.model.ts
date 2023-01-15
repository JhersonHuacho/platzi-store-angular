export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
  description: string;
  category: Category;
}

// CON extends Omit<Product, 'id' | 'category' >
/* puedes crear otra interfaz y gracias a características propias de TypeScript,
   puedes extender el uso de la interfaz Producto y omitir los campos que no sirven para una petición POST.
 */
export interface CreateProductDTO extends Omit<Product, 'id' | 'category'> {
  categoryId: number;
}

// SIN extends Omit<Product, 'id' | 'category' >
export interface CreateProductDTO_ {
  title: string;
  price: number;
  image: string;
  description: string;
  categoryId: number;
}

export interface UpdateProductDTO extends Partial<CreateProductDTO> {}
export interface UpdateProductDTO_ {
  title?: string;
  price?: number;
  images?: string[];
  description?: string;
  category?: Category;
}
