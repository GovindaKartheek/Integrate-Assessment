import React, { useState, useEffect, useRef, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import SkeletonLoader from './SkeletonLoader'; 

const TransactionGrid = () => {
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(true); 
  const gridApiRef = useRef(null); 

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await fetch(
        'https://api.etherscan.io/api?module=account&action=txlist&address=0x6Fb447Ae94F5180254D436A693907a1f57696900&startblock=16689267&endblock=18982605&sort=asc&apikey='
      );
      const data = await response.json();
      setRowData(data.result);
      setLoading(false); 
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setLoading(false);
    }
  };

  const onGridReady = (params) => {
    gridApiRef.current = params.api;
  };

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    enableRowGroup: true,
      enableCharts: true,
    enableRangeSelection:true
  }), []);

  return (
    <div className="transaction-grid-container" id=" dark-background"> 
      {loading ? (
        <SkeletonLoader />
      ) : (
        <div className="ag-theme-alpine" style={{ height: 400 ,width:1500}}>
          <AgGridReact
            rowGroupPanelShow='always'
            rowData={rowData}
            pagination={true}
            paginationPageSize={10}
            columnDefs={[
              { headerName: 'Block Number', field: 'blockNumber' },
              { headerName: 'Hash', field: 'hash' },
              { headerName: 'To', field: 'to' },
              { headerName: 'Value', field: 'value' },
              { headerName: 'Gas', field: 'gas' },
              { headerName: 'Gas Price', field: 'gasPrice' },
              { headerName: 'Gas Used', field: 'gasUsed' },
              { headerName: 'Function Name', field: 'functionName' },
            ]}
            defaultColDef={defaultColDef}
            enableSorting={true}
            enableFilter={true}
            domLayout="autoHeight"
            onGridReady={onGridReady}
            animateRows={true}
            rowSelection='multiple'
            rowMultiSelectWithClick={true}
          />
        </div>
      )}
    </div>
  );
};

export default TransactionGrid;
