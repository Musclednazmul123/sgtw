import React, { useState } from "react";
import {
  Filters,
  Stack,
  TextField,
  Button,
  Spinner,
} from "@shopify/polaris";
import { useAppQuery, useAuthenticatedFetch } from '../hooks';
import { useParams } from 'react-router-dom';
import { packDetailsListStyle, VideoIcon } from "../assets";
import { ImportMinor, SortMinor, CircleDownMajor } from "@shopify/polaris-icons";

const PackDetailsList = ({pack}) => {

  const fetch = useAuthenticatedFetch()
  const { id } = useParams();

  console.log("this is pack list page"+pack.variants)
  const [queryValue, setQueryValue] = useState(null);
  const [selectVariant, setSelectVariant] = useState([])
  const [loading, setLoading] = useState(false);

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
  const { refetch: refetchProductDetails } = useAppQuery({
    url: `/api/packs/${id}`,
  });

  const selectvariant=(e, sample)=>{
    
    if(e.target.checked){
      if (!selectVariant.includes(sample)){
        setSelectVariant([...selectVariant, sample])
      }
    } else {
      if (selectVariant.includes(sample)){
        const filteredArray = selectVariant.filter(e => e !== sample)

        console.log(filteredArray)
        setSelectVariant([...filteredArray])
      }
    }
  }

  const handleDeletesample = async () => {
    console.log(selectVariant)
    setLoading(true)
    try{
      if(selectVariant.length>0){
        for (let index = 0; index < selectVariant.length; index++) {
          console.log(selectVariant[index].variant_id)
          let fd = new FormData();
          fd.append('filesurl', selectVariant[index].filesurl);
          fd.append('variantId', selectVariant[index].variant_id);
          fd.append('productId', pack.productId);

          const deleted = await fetch(`/api/packs/samples/delete`, {
            method: 'post',
            body:fd,
          });
      
          if (deleted.ok) {
            await refetchProductDetails();
          }
        }
        setLoading(false)
      } else{
        setLoading(false)
        console.log('samples is not selected')
      }

    } catch (err){
      console.log(err)
      setLoading(false)
    }
  };

  const pages = Array.from({length:totalpage}, (v,k)=>k+1)

  // if (loading) {
  //   return (
  //     <div>
  //       <div className='loading-state dropzone-loading-state'>
  //         <Spinner accessibilityLabel="Spinner example" size="large" />
  //       </div>
        
  //     </div>
  //   );
  // }

  return (
    <Stack vertical alignment="fill" spacing="extraLoose" distribution="center">
      <button onClick={()=>handleDeletesample()}>delete</button>
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

      {loading ? <div className='loading-state dropzone-loading-state'>
          <Spinner accessibilityLabel="Spinner example" size="large" /></div>:
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
          <td className="th-check"><input onChange={(e)=>selectvariant(e, sample)} type={'checkbox'} id={sample.variant_id} /></td>
          <td className="th-smpl"><img src={pack.thumbnail} width='60px' height='40px' loading="lazy"/>  <p>{sample.title}</p></td>
          <td className="th-price">${sample.price}</td>
          <td className="th-download"><CircleDownMajor width={10} height={10} />{sample.downloads}</td>
          <td className="th-sales">${sample.sales}</td>
          <td className="th-status">{sample.status?<span className="variant-status-active">Active</span>:<span className="variant-status-draft">Draft</span>}</td>
        </tr>
        ))}
      </table>}

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
