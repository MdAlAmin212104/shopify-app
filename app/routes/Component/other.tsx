

export default function LayoutExample() {
  return (
    <div className="Polaris-Page Polaris-Page--fullWidth">
  <div className="Polaris-Page__Content">
    <div className="Polaris-Layout">
      <div className="Polaris-Layout__Section">
        <div className="Polaris-LegacyCard">
          <div className="Polaris-LegacyCard__Header Polaris-LegacyCard__FirstSectionPadding">
            <h2 className="Polaris-Text--root Polaris-Text--headingSm">Order details</h2>
          </div>
          <div className="Polaris-LegacyCard__Section Polaris-LegacyCard__LastSectionPadding">
            <p>Use to follow a normal section with a secondary section to create a 2/3 + 1/3 layout on detail pages (such as individual product or order pages). Can also be used on any page that needs to structure a lot of content. This layout stacks the columns on small screens.</p>
          </div>
        </div>
      </div>
      <div className="Polaris-Layout__Section Polaris-Layout__Section--oneThird">
        <div className="Polaris-LegacyCard">
          <div className="Polaris-LegacyCard__Header Polaris-LegacyCard__FirstSectionPadding">
            <h2 className="Polaris-Text--root Polaris-Text--headingSm">Tags</h2>
          </div>
          <div className="Polaris-LegacyCard__Section Polaris-LegacyCard__LastSectionPadding">
            <p>Add tags to your order.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>)
}
