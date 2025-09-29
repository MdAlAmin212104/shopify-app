export default function DataTable() {
  return (
    <div className="Polaris-Page Polaris-Page--fullWidth">
      <div
        className="Polaris-Box"
        style={
          {
            "--pc-box-padding-block-start-xs": "var(--p-space-400)",
            "--pc-box-padding-block-start-md": "var(--p-space-600)",
            "--pc-box-padding-block-end-xs": "var(--p-space-400)",
            "--pc-box-padding-block-end-md": "var(--p-space-600)",
            "--pc-box-padding-inline-start-xs": "var(--p-space-400)",
            "--pc-box-padding-inline-start-sm": "var(--p-space-0)",
            "--pc-box-padding-inline-end-xs": "var(--p-space-400)",
            "--pc-box-padding-inline-end-sm": "var(--p-space-0)",
            position: "relative",
          } as React.CSSProperties
        }
      >
        <div role="status">
          <p className="Polaris-Text--root Polaris-Text--visuallyHidden">
            Sales by product. This page is ready
          </p>
        </div>
        <div className="Polaris-Page-Header--isSingleRow Polaris-Page-Header--noBreadcrumbs Polaris-Page-Header--mediumTitle">
          <div className="Polaris-Page-Header__Row">
            <div className="Polaris-Page-Header__TitleWrapper Polaris-Page-Header__TitleWrapperExpand">
              <div className="Polaris-Header-Title__TitleWrapper">
                <h1 className="Polaris-Header-Title">
                  <span className="Polaris-Text--root Polaris-Text--headingLg Polaris-Text--bold">
                    Sales by product
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="Polaris-LegacyCard">
          <div className="">
            <div className="Polaris-DataTable__Navigation">
              <button
                className="Polaris-Button Polaris-Button--pressable Polaris-Button--variantTertiary Polaris-Button--sizeMedium Polaris-Button--textAlignCenter Polaris-Button--iconOnly Polaris-Button--disabled"
                aria-label="Scroll table left one column"
                aria-disabled="true"
                type="button"
              >
                <span className="Polaris-Button__Icon">
                  <span className="Polaris-Icon">
                    <svg
                      viewBox="0 0 20 20"
                      className="Polaris-Icon__Svg"
                      focusable="false"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M11.764 5.204a.75.75 0 0 1 .032 1.06l-3.516 3.736 3.516 3.736a.75.75 0 1 1-1.092 1.028l-4-4.25a.75.75 0 0 1 0-1.028l4-4.25a.75.75 0 0 1 1.06-.032Z"
                      ></path>
                    </svg>
                  </span>
                </span>
              </button>
              <button
                className="Polaris-Button Polaris-Button--pressable Polaris-Button--variantTertiary Polaris-Button--sizeMedium Polaris-Button--textAlignCenter Polaris-Button--iconOnly"
                aria-label="Scroll table right one column"
                type="button"
              >
                <span className="Polaris-Button__Icon">
                  <span className="Polaris-Icon">
                    <svg
                      viewBox="0 0 20 20"
                      className="Polaris-Icon__Svg"
                      focusable="false"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.72 14.53a.75.75 0 0 1 0-1.06l3.47-3.47-3.47-3.47a.75.75 0 0 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 0 1-1.06 0Z"
                      ></path>
                    </svg>
                  </span>
                </span>
              </button>
            </div>
            <div className="Polaris-DataTable Polaris-DataTable__ShowTotals">
              <div className="Polaris-DataTable__ScrollContainer">
                <table className="Polaris-DataTable__Table">
                  <thead>
                    <tr>
                      <th
                        data-polaris-header-cell="true"
                        className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--header"
                        scope="col"
                      >
                        Product
                      </th>
                      <th
                        data-polaris-header-cell="true"
                        className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--header Polaris-DataTable__Cell--numeric"
                        scope="col"
                      >
                        Price
                      </th>
                      <th
                        data-polaris-header-cell="true"
                        className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--header Polaris-DataTable__Cell--numeric"
                        scope="col"
                      >
                        SKU Number
                      </th>
                      <th
                        data-polaris-header-cell="true"
                        className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--header Polaris-DataTable__Cell--numeric"
                        scope="col"
                      >
                        Net quantity
                      </th>
                      <th
                        data-polaris-header-cell="true"
                        className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--header Polaris-DataTable__Cell--numeric"
                        scope="col"
                      >
                        Net sales
                      </th>
                    </tr>
                    <tr>
                      <th
                        className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--firstColumn Polaris-DataTable__Cell--total"
                        scope="row"
                      >
                        Totals
                      </th>
                      <td className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--total"></td>
                      <td className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--total"></td>
                      <td className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--total Polaris-DataTable__Cell--numeric">
                        255
                      </td>
                      <td className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--total Polaris-DataTable__Cell--numeric">
                        $155,830.00
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="Polaris-DataTable__TableRow Polaris-DataTable--hoverable">
                      <th
                        className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--firstColumn"
                        scope="row"
                      >
                        Emerald Silk Gown
                      </th>
                      <td className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--numeric">
                        $875.00
                      </td>
                      <td className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--numeric">
                        124689
                      </td>
                      <td className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--numeric">
                        140
                      </td>
                      <td className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--numeric">
                        $122,500.00
                      </td>
                    </tr>
                    <tr className="Polaris-DataTable__TableRow Polaris-DataTable--hoverable">
                      <th
                        className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--firstColumn"
                        scope="row"
                      >
                        Mauve Cashmere Scarf
                      </th>
                      <td className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--numeric">
                        $230.00
                      </td>
                      <td className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--numeric">
                        124533
                      </td>
                      <td className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--numeric">
                        83
                      </td>
                      <td className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--numeric">
                        $19,090.00
                      </td>
                    </tr>
                    <tr className="Polaris-DataTable__TableRow Polaris-DataTable--hoverable">
                      <th
                        className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--firstColumn"
                        scope="row"
                      >
                        Navy Merino Wool Blazer with khaki chinos and yellow
                        belt
                      </th>
                      <td className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--numeric">
                        $445.00
                      </td>
                      <td className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--numeric">
                        124518
                      </td>
                      <td className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--numeric">
                        32
                      </td>
                      <td className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--numeric">
                        $14,240.00
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
