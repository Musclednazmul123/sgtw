import { Button, Card, Icon, Stack } from "@shopify/polaris";
import { packStyle, musicIcon, downloadIcon, packThumbnail } from "../assets";
import { EditMajor } from "@shopify/polaris-icons";
import { PickDetailsModal, EmptyState, PackDetailsList } from "./";
import { useNavigate } from "react-router-dom";

export function PackDetails() {
  const pack = undefined;
  const navigate = useNavigate();

  return (
    <>
      <Card sectioned subdued>
        <Card.Section>
          <div className="viewport-container">
            <Stack>
              <div className="pack-thumbnail-container">
                <div className="thumbnail-edit">
                  <div>
                    <Icon source={EditMajor} color="highlight" />
                  </div>
                  <p>Change Pack Thumbnail</p>
                </div>
                <div className="pack-thumbnail" style={{ backgroundImage: `url(${packThumbnail})`}}></div>
                <small>
                  Accepts:
                  <i> png, jpg, svg, jpeg</i>
                </small>
              </div>
              <Stack vertical distribution="fill">
                <h2 className="pack-title">Pack</h2>
                <Stack alignment="center">
                  <Stack spacing="tight">
                    <img src={musicIcon} style={{ marginTop: "2px" }} />
                    <p className="pack-caption">
                      Hip Hop 
                    </p>
                    <p className="pack-caption bold-caption">
                    $44.75 
                    </p>
                  </Stack>
                  <PickDetailsModal buttonText="Edit Pack Details" link />
                </Stack>
                <p className="pack-sub-caption">
                  *This pack can hold 250 samples, 0 added and 250 left
                </p>
                <p className="pack-caption">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fames nunc mauris nunc non.
                </p>
                <Stack>
                  <span onClick={() => navigate("/packs/new")}>
                    <Button primary>+ Add Samples</Button>
                  </span>
                  <Button destructive>Delete</Button>
                </Stack>
              </Stack>
            </Stack>
            <Stack>
              <Stack spacing="tight">
                <p className="pack-caption">Downloads: <span className="bold-caption">0</span></p>{" "}
                <img src={downloadIcon} color="base" />
              </Stack>
              <p className="pack-caption">Sales: <span className="bold-caption">$0.0</span></p>
            </Stack>
          </div>
        </Card.Section>
        <Card.Section>
          {pack ? "pack is render" : <PackDetailsList />}
        </Card.Section>
      </Card>
    </>
  );
}
