
import { useMochimapApi } from 'MochiMapHooks';
import { isDefaultTag, mcm } from 'MochiMapUtils';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function Transaction () {
  const { txid } = useParams();
  const [init, setInit] = useState(true);
  const [tx, requestTx] = useMochimapApi('/transaction/' + txid);

  useEffect(() => {
    if (init) {
      requestTx();
      setInit(false);
    }
  }, [init, setInit, requestTx]);

  return (
    <div className='tr_det'>
      <div className='tr_det_inn'>
        <div className='trdet_head'>
          <p>
            {tx.error && <p>{tx.data?.error || 'Error loading '}</p>}
            {tx.loading && (
              <span>
                <FontAwesomeIcon icon={faSpinner} pulse /> Loading&nbsp;
              </span>
            )}
            Transaction details
          </p>
        </div>
        <div className='trdet_main'>
          <ul className='trdet'>
            <li>
              <p>Transaction id</p>
              <p>{tx.data?.txid}</p>
            </li>
            <li>
              <p>Transaction Signature</p>
              <p>{tx.data?.txsig}</p>
            </li>
            <li>
              <p>Source</p>
              {!isDefaultTag(tx.data?.srctag) && tx.data?.srctag && (
                <p>
                  <Link to={`/explorer/ledger/tag/${tx.data?.srctag}`}>
                    τ-{tx.data?.srctag}
                  </Link>
                </p>
              )}
              {tx.data?.srcaddr && (
                <p>
                  <Link to={`/explorer/ledger/address/${tx.data?.srcaddr}`}>
                    ω+{tx.data?.srcaddr}
                  </Link>
                </p>
              )}
            </li>
            <li>
              <p>Destination</p>
              {!isDefaultTag(tx.data?.dsttag) && tx.data?.dsttag && (
                <p>
                  <Link to={`/explorer/ledger/tag/${tx.data?.dsttag}`}>
                    τ-{tx.data?.dsttag}
                  </Link>
                </p>
              )}
              {tx.data?.dstaddr && (
                <p>
                  <Link to={`/explorer/ledger/address/${tx.data?.dstaddr}`}>
                    ω+{tx.data?.dstaddr}
                  </Link>
                </p>
              )}
            </li>
            <li>
              <p>Change</p>
              {!isDefaultTag(tx.data?.chgtag) && tx.data?.chgtag && (
                <p>
                  <Link to={`/explorer/ledger/tag/${tx.data?.chgtag}`}>
                    τ-{tx.data?.chgtag}
                  </Link>
                </p>
              )}
              {tx.data?.chgaddr && (
                <p>
                  <Link to={`/explorer/ledger/address/${tx.data?.chgaddr}`}>
                    ω+{tx.data?.chgaddr}
                  </Link>
                </p>
              )}
            </li>
            <li>
              <p>Send total</p>
              <p>{tx.data?.sendtotal && mcm(tx.data.sendtotal, 9, 0)}</p>
            </li>
            <li>
              <p>Change total</p>
              <p>{tx.data?.changetotal && mcm(tx.data.changetotal, 9, 0)}</p>
            </li>
            <li>
              <p>Transaction fee</p>
              <p>{tx.data?.txfee && mcm(tx.data.txfee, 9, 0)}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}