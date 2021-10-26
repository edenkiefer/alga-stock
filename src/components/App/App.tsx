import React, { useEffect, useState } from 'react';
import './App.css';
import Header from '../Header'
import Container from '../../shared/Container';
import Table, { TableHeader } from '../../shared/Table'
import { Product } from '../../shared/Table/Table.mockdata'
import ProductForm, { ProductCreator } from '../Products/ProductForm'
import { 
  createSingleProduct, 
  getAllProducts, 
  updateSingleProduct,
  deleteSingleProduct
} 
from '../../services/Product.service'
import Swal from 'sweetalert2';

const headers: TableHeader[] = [
  {key: 'name', value: 'Product'},
  {key: 'price', value: 'Price'},
  {key: 'stock', value: 'Available Stock', right: true}
]

const App = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [updatingProject, setUpdatingProject] = useState<Product | undefined>(undefined)
  
  async function fetchData() {
    const _products = await getAllProducts();
    setProducts(_products)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleProductSubmit = async (product: ProductCreator) => {
    try {
      await createSingleProduct(product)
      fetchData()
      Swal.fire('Uhul!', 'Product successfully created', 'success')
    } catch (error) {
      Swal.fire('Oops!', error.message, 'error')
    }
  }

  const handleProductUpdate = async (newProduct: Product) => {
    try {
      await updateSingleProduct(newProduct)
      fetchData()
      Swal.fire('Uhul!', 'Product successfully updated', 'success')
    } catch (error) {
      Swal.fire('Oops!', error.message, 'error')
    }

    setUpdatingProject(undefined)
  }

  const handleProductEdit = (product: Product) => {
    setUpdatingProject(product)
  }

  const handleProductDetail = (product: Product) => {
    Swal.fire(
      'Product Details',
      `${product.name} costs ${product.price}. And we have ${product.stock} in stock `,
      'info'
    )
  }

  const deleteProduct = async(id: string) => {
    try {
      await deleteSingleProduct(id)
      Swal.fire('Uhul!', 'Product successfully deleted', 'success')
      fetchData()
    } catch (error) {
      Swal.fire('Oops!', error.message, 'error')
    }

    setUpdatingProject(undefined)
  }

  const handleProductDelete = (product: Product) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#09f',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, delete ${product.name}!`
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(product._id)
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  return <div className="App">
      <Header title="AlgaStock"/>
      <Container>
        <Table 
          headers={headers} 
          data={products}
          enableActions
          onEdit={handleProductEdit}
          onDetail={handleProductDetail}
          onDelete={handleProductDelete}
        />
        <ProductForm 
          form={updatingProject}
          onSubmit={handleProductSubmit}
          onUpdate={handleProductUpdate}
        />
      </Container>
    </div>
  ;
}

export default App;
