import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { Helmet } from "react-helmet";

const Breadcrumb = ({
  items = [],
  pageTitle = "",
  backgroundColor = "#f3f3f3",
}) => {
  return (
    <>
      {pageTitle && (
        <Helmet>
          <title>{pageTitle} | Your Shop Name</title>
        </Helmet>
      )}
      <div
        style={{
          backgroundColor: backgroundColor,
          fontWeight: "450",
        }}
        className="fs-6"
      >
        <Container>
          <div style={{ padding: "20px 0px" }}>
            {items.map((item, index) => (
              <React.Fragment key={index}>
                {item.home && (
                  <Link
                    to="/"
                    style={{
                      textDecoration: "none",
                      color: "black",
                    }}
                  >
                    <FaHome className="mb-1" /> Trang chủ /&nbsp;
                  </Link>
                )}

                {item.link ? (
                  <Link
                    to={item.link}
                    style={{
                      textDecoration: "none",
                      color: "black",
                    }}
                  >
                    {item.label} {index < items.length - 1 ? "/\u00A0" : ""}
                  </Link>
                ) : (
                  <span>{item.label}</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
};

export default Breadcrumb;
