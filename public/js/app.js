const App = () => {

    const [products, setProducts] = React.useState([])

    const [form, setForm] = React.useState({
        name: '',
        price: ''
    })


    const fetchProducts = () => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data)
            })
    }

    React.useEffect(() => {
        fetchProducts()
    }, [])


    const updateForm = (e, field) => {
        setForm({
            ...form, [field]: e.target.value
        })
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        if (!form.name || !form.price) {
            return
        }

        fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })
            .then(res => res.json())
            .then(data => {
                fetchProducts()
                setForm({ name: '', price: '' })
            })
    }

    const deleteProduct = (productId) => {
        fetch(`/api/products/${productId}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                fetchProducts()
                console.log(data);
            })
    }

    return (
        <>
            <div className="card">
                <div className="card-header">
                    Featured
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            className="form-control mt-3"
                            placeholder='Product name...'
                            value={form.name}
                            onChange={(e) => updateForm(e, 'name')}
                        />
                        <input
                            type="text"
                            name="price"
                            className="form-control mt-3"
                            placeholder='Price...'
                            value={form.price}
                            onChange={(e) => updateForm(e, 'price')}
                        />
                        <button
                            type="submit"
                            className="btn btn-primary my-3"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
            <ul className="list-group my-3">
                {products.map((product) => {
                    return <li className='list-group-item d-flex justify-content-between align-items-center' key={product.id}>
                        <div>
                            <strong>{product.name}</strong>: ${product.price}
                        </div>
                        <button
                            className='btn'
                            onClick={() => deleteProduct(product.id)}
                        >
                            <img src="https://icons.getbootstrap.com/assets/icons/trash-fill.svg" alt="trash" />
                        </button>
                    </li>
                })}
            </ul>
        </>
    )
}


ReactDOM.render(<App />, document.getElementById('app'))

// import { createRoot } from 'react-dom/client';
// const container = document.getElementById('app');
// const root = createRoot(container);
// root.render(<App tab="home" />);