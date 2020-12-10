const Header = ({ categories, selected, setSelected }) => {
  const renderItem = React.useCallback(
    (item, index) => {
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
    },
    [selected]
  );
  return (
    <>
      <div id="header-container" />
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
      <div className="section">
        <div className="infos">
          <span className="name">{category.name}</span>
          {category.description && (
            <span className="description">{category.description}</span>
          )}
        </div>
      </div>
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
  const [selectedTab, setSelectedTab] = React.useState(0);

  const onScroll = () => {
    const scrollPos =
      document.body.scrollTop || document.documentElement.scrollTop;
    const screenHeight = window.screen.height;

    const items = document.querySelectorAll("#header > .item");
    items.forEach((currLink, index) => {
      const refElement = document.getElementById(
        currLink.getAttribute("href").replace("#", "")
      );
      const box = refElement.getBoundingClientRect();

      const boxPosTop = box.top;

      if (
        boxPosTop <= scrollPos &&
        (boxPosTop + refElement.clientHeight) - 60 > scrollPos
      ) {
        setSelectedTab(index);
      }
    });
  };

  React.useEffect(() => {
    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <Header
        selected={selectedTab}
        setSelected={setSelectedTab}
        categories={menu.data}
      />
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
