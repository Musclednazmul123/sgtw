import React, { useState } from "react";
import {
  Filters,
  Stack,
  TextField,
  Button,
} from "@shopify/polaris";

import { packDetailsListStyle, VideoIcon } from "../assets";
import { ImportMinor, SortMinor, CircleDownMajor } from "@shopify/polaris-icons";

const PackDetailsList = ({pack}) => {

  console.log("this is pack list page"+pack.variants)
  const [queryValue, setQueryValue] = useState(null);

  const [page, setPage] = useState(1)
  const sampleperpage = 10
  const totalpage = Math.ceil(pack.variants.length/sampleperpage)
  const slice =  pack.variants.length>sampleperpage*page?sampleperpage*page:pack.variants.length
  const variants = totalpage>1? pack.variants.slice(slice-sampleperpage, slice): pack.variants

  console.log(variants)
  let filters = [
    {
      key: "actions",
      label: "Actions",
      filter: (
        <TextField type="text" label="Actions" autoComplete="off" labelHidden />
      ),
      shortcut: true,
    },
    {
      key: "bpm",
      label: "BPM",
      filter: (
        <TextField type="text" label="BPM" autoComplete="off" labelHidden />
      ),
      shortcut: true,
    },
    {
      key: "genre",
      label: "Genre",
      filter: (
        <TextField type="text" label="Genre" autoComplete="off" labelHidden />
      ),
      shortcut: true,
    },
    {
      key: "key",
      label: "Key",
      filter: (
        <TextField type="text" label="Key" autoComplete="off" labelHidden />
      ),
      shortcut: true,
    },
    {
      key: "edit",
      label: "Edit",
      filter: (
        <TextField type="text" label="Edit" autoComplete="off" labelHidden />
      ),
      shortcut: true,
    },
  ];

  const handlepaginate =(prams)=>{
    if (prams=='next'){
      if (totalpage<=page+1){
        document.getElementById('next-page-button').disabled = true
        document.getElementById('previous-page-button').disabled = false
        setPage(totalpage)
      } else{
        document.getElementById('next-page-button').disabled = false
        document.getElementById('previous-page-button').disabled = true
        setPage(page+1)
      }
    } else if(prams=='previous'){
      if (page-1<=1){
        document.getElementById('previous-page-button').disabled = true
        document.getElementById('next-page-button').disabled = false
        setPage(1)
      } else{
        document.getElementById('previous-page-button').disabled = false
        document.getElementById('next-page-button').disabled = true
        setPage(page-1)
      }
    } else{
      setPage(prams)
      if (prams==1){
        document.getElementById('previous-page-button').disabled = true
        document.getElementById('next-page-button').disabled = false
        
      } else if(prams==totalpage) {
        document.getElementById('previous-page-button').disabled = false
        document.getElementById('next-page-button').disabled = true
      } else{
        document.getElementById('previous-page-button').disabled = false
        document.getElementById('next-page-button').disabled = false
      }
    }
  }
  //all the api request send from here

  const pages = Array.from({length:totalpage}, (v,k)=>k+1)
  return (
    <Stack vertical alignment="fill" spacing="extraLoose" distribution="center">
      <div className="filterWrapper">
        <div className="filter">
        <Filters
          filters={filters}
          queryValue={queryValue}
          queryPlaceholder="Filter"
          onQueryChange={setQueryValue}
        />
        </div>
        <Button icon={SortMinor}>Sort</Button>
      </div>
      {/* There should be render the   */}

      <table className="samples-table">
        <tr className="active-header">
          <th className="th-check"><input type={'checkbox'} id='samples-selected-status' /></th>
          <th className="th-smpl">Samples</th>
          <th className="th-price">Price</th>
          <th className="th-download">Downloads</th>
          <th className="th-sales">Sales</th>
          <th className="th-status">Status</th>
        </tr>
        {/* table for samples */}
        {variants.map((sample)=>(
        <tr key={sample.variant_id}>
          <td className="th-check"><input type={'checkbox'} id={sample.variant_id} /></td>
          <td className="th-smpl"><img src={pack.thumbnail} width='60px' height='40px' loading="lazy"/>  <p>{sample.title}</p></td>
          <td className="th-price">${sample.price}</td>
          <td className="th-download"><CircleDownMajor width={10} height={10} />{sample.downloads}</td>
          <td className="th-sales">${sample.sales}</td>
          <td className="th-status">{sample.status?<span className="variant-status-active">Active</span>:<span className="variant-status-draft">Draft</span>}</td>
        </tr>
        ))}
      </table>

      {/* <Stack distribution="center">
        <Pagination
          label={label}
          hasPrevious
          onPrevious={() => {
            console.log("Previous");
          }}
          hasNext
          onNext={() => {
            console.log("Next");
          }}
        />
      </Stack> */}
      {totalpage>1&&<div className="pagination">
        {/* pagination will render here */}
        <button className={page==1?"button btn-disable":"button"} id='previous-page-button' onClick={(e)=>handlepaginate('previous')}  >prev</button>
        {pages.map((i)=><button onClick={(e)=>handlepaginate(i)} >{i}</button>)}
        <button id='next-page-button' onClick={(e)=>handlepaginate('next')} >next</button>
        </div>}
    </Stack>
  );
};

export default PackDetailsList;
