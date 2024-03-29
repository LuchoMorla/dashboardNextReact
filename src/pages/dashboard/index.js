import React, { useState } from 'react';
import endPoints from '@services/api'
import useFetch from '@hooks/useFetch';
import Pagination from '../../components/Paginacion.jsx';
import { Chart } from '@common/Chart';

  export default function Dashboard() {

    /* trabajamos lo que es el paginado de la impresion de productos */

    const PRODUCT_LIMIT = 10;

    const [offsetProducts, setOffsetProducts] = useState(0);

    const products = useFetch(endPoints.products.getProducts(PRODUCT_LIMIT, offsetProducts), offsetProducts);
    const totalProducts = useFetch(endPoints.products.getProducts(0, 0)).length;

    /* vamos a extraer la información que tenemos de nuestros productos para crear una grafica con chart */

    const categoryName = products?.map((product) => product.category);
    const categoryCount = categoryName?.map((category) => category.name);

    const countOcurrences = (arr) => arr.reduce((prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev),{});

    const data = {
      datasets: [{
        label: 'Categories',
        data: countOcurrences(categoryCount),
        borderWindth: 2,
        backgroundColor: ['#ffbb11', '#ff0000', '#c0c0c0', '#50AF95', '#f3ba', '#61d1ed', '#2a71d0'],
      }]
    }

    return (
      <>
      <Chart className="mb-8 mt-2" chartData={data} />
      {totalProducts > 0 && <Pagination totalItems={totalProducts} itemsPerPage={PRODUCT_LIMIT} setOffset={setOffsetProducts} neighbours={3}></Pagination>}
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        product
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Id
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products?.map((product) => (
                      <tr key={`Product-item-${product.id}`}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-full" src={product.images[0]} alt="" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{product.title}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{product.category.name}</div>
                          <div className="text-sm text-gray-500">Category Id {product.category.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">{product.price}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a href="#" className="text-indigo-600 hover:text-indigo-900">
                            Edit
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a href="#" className="text-indigo-600 hover:text-indigo-900">
                            Delete
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }