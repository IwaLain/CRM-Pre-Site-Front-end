import button from "../UIKit/button/button";
import Badge from "../UIKit/Badge/Badge";
import Input from "../UIKit/Input/Input";
import Select from "../UIKit/Select/Select";
import Textarea from "./Textarea/Textarea";

const UIKit = () => {
  return (
    <div className="ui-kit">
      <h1>Page Title - H1</h1>
      <h3 className="mb-5">Page SubTitle - H3</h3>
      <h3>Buttons</h3>
      <div className="ui-kit__category-wrapper mb-5">
        <button color="success">Success</button>
        <button color="danger">Danger</button>
        <button color="warning">Warning</button>
        <button color="primary">Primary</button>
        <button color="info">Info</button>
        <button color="default">Default</button>
      </div>
      <h3>Badges</h3>
      <div className="ui-kit__category-wrapper mb-5">
        <Badge color="success">Success</Badge>
        <Badge color="danger">Danger</Badge>
        <Badge color="warning">Warning</Badge>
        <Badge color="primary">Primary</Badge>
        <Badge color="info">Info</Badge>
        <Badge color="default">Default</Badge>
      </div>
      <h3>Forms</h3>
      <div className="ui-kit__category-wrapper mb-5">
        <Input placeholder="Input" />
        <Select>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </Select>
        <Input value="Disabled input with value" disabled />
        <Textarea placeholder="Textarea" />
        <form style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div>
            <Input id="radio" name="radio" type="radio" defaultChecked />
            <label htmlFor="radio">Radio</label>
          </div>
          <div>
            <Input id="radio2" name="radio" type="radio" />
            <label htmlFor="radio2">Radio2</label>
          </div>
        </form>
        <form style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div>
            <Input id="checkbox" name="checkbox" type="checkbox" />
            <label htmlFor="checkbox">Checkbox</label>
          </div>
          <div>
            <Input id="checkbox2" name="checkbox" type="checkbox" />
            <label htmlFor="checkbox2">Checkbox2</label>
          </div>
        </form>
      </div>
      <h3>Controls</h3>
      <div className="ui-kit__category-wrapper">
        <button type="list-view" />
        <button type="block-view" />
      </div>
    </div>
  );
};

export default UIKit;
