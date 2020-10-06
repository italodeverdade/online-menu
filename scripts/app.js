const Header = ({ categories }) => {
  const [selected, setSelected] = React.useState(0);
  const renderItem = (item, index) => {
    let classname = "item";
    if (index === selected) classname += " selected";
    return (
      <a
        className={classname}
        href={`#category-${index}`}
        onClick={() => {
          setSelected(index);
        }}
        key={index}
      >
        <span>{item.name}</span>
      </a>
    );
  };
  return (
    <>
      <div id="header-container">
        <img src="/assets/images/cover.jpg" />
      </div>
      <div id="header">{categories.map(renderItem)}</div>
    </>
  );
};

const Category = ({ category, id }) => {
  const renderItem = (item, index) => {
    return <Product product={item} key={index} />;
  };
  return (
    <div id={`category-${id}`} className="category">
      <span className="name">{category.name}</span>
      {category.description && (
        <span className="description">{category.description}</span>
      )}
      <div className="products">{category.items.map(renderItem)}</div>
    </div>
  );
};

const Product = ({ product }) => {
  return (
    <div className="product">
      <span className="title">{product.name}</span>
      {product.description && (
        <span className="description">{product.description}</span>
      )}
      <span className="price">
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(product.price)}
      </span>
    </div>
  );
};

const App = () => {
  return (
    <>
      <Header categories={menu.data} />
      {menu.data.map((category, categoryIndex) => {
        return (
          <Category
            category={category}
            id={categoryIndex}
            key={categoryIndex}
          />
        );
      })}
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
