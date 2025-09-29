!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).ethers={})}(this,(function(t){"use strict";var e,i,s;const r="ethers/5.7.2";let n=!1,o=!1;const a={debug:!1,error:!0,info:!1,warning:!0},c=(e,i)=>{const s=e.slice(0);for(let t=0;t<i;t++)s.push(0);return s},u=new RegExp("^[a-zA-Z0-9_]*$");class l extends Error{constructor(t,e,i){""!==t&&(t+=": "),super(t+function(t,e){let i="";switch(t){case"INVALID_ARGUMENT":i="invalid argument";break;case"NUMERIC_FAULT":i="numeric fault";break;case"UNSUPPORTED_OPERATION":i="unsupported operation";break;case"NOT_IMPLEMENTED":i="not implemented";break;case"BUFFER_OVERRUN":i="buffer overrun";break;case"NETWORK_ERROR":i="network error";break;case"SERVER_ERROR":i="server error";break;case"TIMEOUT":i="timeout";break;case"BAD_DATA":i="bad data";break;case"CANCELLED":i="cancelled";break;case"CALL_EXCEPTION":i="call exception";break;case"INSUFFICIENT_FUNDS":i="insufficient funds";break;case"NONCE_EXPIRED":i="nonce expired";break;case"REPLACEMENT_UNDERPRICED":i="replacement transaction underpriced";break;case"UNPREDICTABLE_GAS_LIMIT":i="cannot estimate gas; transaction may fail or may require manual gas limit";break;case"TRANSACTION_REPLACED":i="transaction replaced";break;default:i="unknown error"}return e&&(i+=" (reason="+JSON.stringify(e)+")"),i}(e,i.reason)),this.reason=i.reason,this.code=e,Object.keys(i).forEach((t=>{this[t]=i[t]}))}toString(){const t=this.message,e=[];return Object.keys(this).forEach((t=>{e.push(t+": "+this[t])})),e.push("message: "+t),e.join(",")}what(){return this.reason}}function h(t,e,i){i||(i={}),null==e&&(e="UNKNOWN_ERROR");const s=new l(t,e,i);throw o&&console.log(s),s}const f={};let d={};const p=(e="latest")=>{let i=f[e];if(!i){const s="string"==typeof e?e:e.name;const r="string"==typeof e||e.ensAddress||h("invalid network object",t.Logger.errors.INVALID_ARGUMENT,{argument:"network",value:e}),o=null;i={name:s,chainId:null,ensAddress:r,ensNetwork:o},d.getNetwork&&(i=d.getNetwork(i))}return i};function g(t,e,i){const s=t.match(/^(.*)\[([0-9]*)\]$/);if(s)return{name:s[1],length:parseInt(s[2]),type:"array"};return{name:t,length:-1,type:t}}function m(t){return!!t.match(/^u?int/)}function y(t){return"bytes"===t}function w(t){return!!t.match(/^bytes([0-9]+)$/)}function _(t){return"address"===t}const b=(e,i,s)=>{const r={};return e.forEach((e=>{const n=e.name;u.test(n)||h("invalid name for event parameter",t.Logger.errors.INVALID_ARGUMENT,{argument:"name",value:n,param:e});for(let t in i){if(t===n)return void h("duplicate definition for "+t,t.Logger.errors.INVALID_ARGUMENT,{argument:"name",value:n,param:e})}r[n]={const:e.isConst,indexed:!!e.indexed,name:n,type:e.type,baseType:g(e.type).type}})),r},I="0123456789abcdef";function O(t){return"0x"===t.substring(0,2).toLowerCase()}function S(t){if("string"!=typeof t)return!1;if(!O(t))return!1;for(let e=2;e<t.length;e++){if(-1===I.indexOf(t[e].toLowerCase()))return!1}return!0}const C={};let T={};const E=9007199254740991;function k(t,e){if(null!=e&&"string"!=typeof e&&"number"!=typeof e&&"boolean"!=typeof e||null==t)return null;const i=t.toString();if(i.match(/^-?[0-9]*$/))try{if(i.length>1&&"0"===i[0])return null;return C.from(i)}catch(t){}const s=e||"";return i.match(/^-?[0-9]*\.[0-9]*$/)?C.from(T.parseFixed(i,s.length).toString()):i.match(/^-?[0-9]+\.[0-9]*e[+-]?[0-9]+$/)?C.from(T.parseFixed(i,s.length).toString()):S(i)?C.from(i):null}class x{constructor(t,e){this.value=e,Object.defineProperty(this,"_isBytes",t)}}const v={};let A;function P(t){const e=new Uint8Array(t);return e.BYTES_PER_ELEMENT!==t.BYTES_PER_ELEMENT&&"undefined"!=typeof Buffer&&Buffer.from&&e.constructor!==Buffer&&(e instanceof Buffer||(e.buffer.slice||(e.buffer=function(){const e=this;const i=new ArrayBuffer(e.length);const s=new Uint8Array(i);return s.set(e,0),i}.call(e)),e=Buffer.from(e.buffer,e.byteOffset,e.byteLength))),e}function N(t,e){const i={};void 0===e&&(e={});const s=Object.assign({},e);return s.allowMissing||(s.allowMissing=!1),s.hexPad||(s.hexPad="left"),O(t)?(t=t.substring(2),t.length%2&&(("left"===s.hexPad?t="0"+t:"right"===s.hexPad?t+="0":h("hex data is odd-length",v.INVALID_ARGUMENT,{arg:"value",value:t}))),i.data=new Uint8Array(t.length/2),t.match(/([0-9a-f][0-9a-f])/gi).forEach(((t,e)=>{i.data[e]=parseInt(t,16)}))):s.allowMissing&&null==t?i.data=new Uint8Array:h("invalid hexidecimal string",v.INVALID_ARGUMENT,{arg:"value",value:t}),i.data}const U={};let R;class L{constructor(){throw new Error("cannot instantiate a static class")}}class M extends L{static get errors(){return t.Logger.errors}static isError(t,e){return t instanceof l&&(!e||t.code===e)}static makeError(t,e,i){return new l(t,e,i)}static throwError(t,e,i){throw this.makeError(t,e,i)}static checkArgumentCount(t,e,i){i?t<e&&this.throwError("missing argument: "+i,"MISSING_ARGUMENT",{count:t,expectedCount:e}):t!==e&&this.throwError("invalid argument count","INVALID_ARGUMENT",{count:t,expectedCount:e})}static checkNew(t,e){"object"!=typeof t||null==t.constructor||t.constructor.name!==e.name&&this.throwError("called as a function without new","INVALID_ARGUMENT",{name:e.name})}static checkAbstract(t,e){"object"==typeof t&&t.constructor===e&&this.throwError("cannot instantiate abstract class "+JSON.stringify(e.name)+" directly; use a sub-class","UNSUPPORTED_OPERATION",{name:t.constructor.name,operation:"new "+t.constructor.name})}}const D=(()=>{try{const t="undefined"!=typeof BigInt;if(t)return BigInt}catch(t){}return null})(),F=(()=>{try{const t="undefined"!=typeof atob;if(t)return atob}catch(t){}return null})(),$=(()=>{try{const t="undefined"!=typeof btoa;if(t)return btoa}catch(t){}return null})();var B,G,z;!function(t){t.Strict="strict",t.Loose="loose",t.Lenient="lenient"}(B||(B={})),function(t){t.C="c",t.D="d"}(G||(G={})),function(t){t.K="k",t.T="t"}(z||(z={}));var V=Object.freeze({__proto__:null, SupportedAlgorithm:B, UnicodeNormalizationForm:G, Utf8ErrorReason:z});const j=(()=>{try{if("undefined"!=typeof TextEncoder)return new TextEncoder;if("undefined"!=typeof require){const t=require("util");if("undefined"!=typeof t.TextEncoder)return new t.TextEncoder}return null}catch(t){}return null})(),W=(()=>{try{if("undefined"!=typeof TextDecoder)return new TextDecoder;if("undefined"!=typeof require){const t=require("util");if("undefined"!=typeof t.TextDecoder)return new t.TextDecoder}return null}catch(t){}return null})();class q extends x{constructor(t){super({bytes:!0},P(t))}slice(t,e){return e>this.length&&(e=this.length),t>this.length&&(t=this.length),t<0&&(t=0),e<0&&(e=0),new q(this.slice(t,e))}subarray(t,e){return new q(this.subarray(t,e))}static isBytes(t){return t instanceof q}}const H=new M;const J="0x";var Z,K,Q,X,Y,tt;!function(t){t.BN_BE="be",t.BN_LE="le"}(Z||(Z={})),function(t){t.Ethers="ethers",t.Web="web"}(K||(K={})),function(t){t.Utf8="utf8",t.Json="json"}(Q||(Q={})),function(t){t.Address="address",t.BigNumber="bigNumber",t.Bytes="bytes",t.BytesLike="bytesLike",t.Chain="chain",t.Constant="constant",t.Const="const",t.Format="format",t.Fragment="fragment",t.Name="name",t.NewArray="newArray",t.Params="params",t.Property="property",t.SignedTransaction="signedTransaction",t.Signature="signature",t.String="string",t.Transaction="transaction",t.Type="type",t.TypedData="typedData",t.Value="value",t.Version="version"}(X||(X={})),function(t){t.Utf8="utf8",t.Base16="base16",t.Base64="base64"}(Y||(Y={})),function(t){t.Erc20="erc20",t.Erc721="erc721",t.Erc721Metadata="erc721-metadata",t.Erc1155="erc1155",t.Erc1155Metadata="erc1155-metadata"}(tt||(tt={}));var et,it,st,rt=Object.freeze({__proto__:null, BigNumberish:null, Bytes:null, BytesLike:null, DataOptions:null, Hexable:null, HexString:null, NameResolver:null, Numeric:null, OnceBlockable:null, OncePollable:null, Pausable:null, Signature:null, SignatureLike:null, TransactionRequest:null, Endianness:Z, CoderType:K, CoerceFunc:Q, ParamType:X, UnicodeEncoding:Y, Wordlist:null, WordlistOwl:null, WordlistOwlA:null, AbiCoder:null, ConstructorFragment:null, EventFragment:null, ErrorFragment:null, FormatTypes:null, Fragment:null, FunctionFragment:null, Interface:null, ParamType:null, Indexed:null, LogDescription:null, TransactionDescription:null, SupportedStandardEvents:tt});function nt(t){if(t%1!=0)throw new Error("not an integer");return t}function ot(t,e){const i="number"==typeof t?t:parseInt(t);if(i==t){const t="0x"+i.toString(16);return nt(i),"number"==typeof e&&t.length<2+2*e?c(t,2+2*e-t.length):t}return null}const at={};let ct,ut;const lt=new RegExp("^0x[0-9a-fA-F]*$");let ht={};const ft=new RegExp("^(0x)?[0-9a-fA-F]*$");let dt,pt;const gt={};let mt;const yt={};let wt;const _t="object"==typeof performance&&performance.now?performance:null;let bt;let It,Ot,St,Ct,Tt,Et;function kt(){if(!St){const t=d.getSetting("randomBytes");St=t?t.randomBytes:null;const e=d.getSetting("crypto",{browser:!0,node:!0,noble:!0});const i=d.getSetting("fetch");e.browser&&("undefined"!=typeof self&&self.crypto||"undefined"!=typeof window&&window.crypto)?Ot="browser":e.node&&"undefined"!=typeof require?Ot="node":e.noble&&"undefined"!=typeof require?Ot="noble":Ot=null,i&&("function"==typeof i.fetch?Tt=i.fetch:"undefined"!=typeof global&&"function"==typeof global.fetch?Tt=global.fetch:"undefined"!=typeof self&&"function"==typeof self.fetch?Tt=self.fetch:"undefined"!=typeof window&&"function"==typeof window.fetch&&(Tt=window.fetch))}function xt(){return null==Ot?h("crypto not available",t.Logger.errors.UNSUPPORTED_OPERATION,{operation:"crypto.randomBytes"}):("browser"===Ot?It=function(t){const e=self.crypto||window.crypto;const i=new Uint8Array(t);return e.getRandomValues(i),P(i)}:"node"===Ot?It=function(t){const e=require("crypto");return P(e.randomBytes(t))}:"noble"===Ot?It=function(t){const e=require("@noble/hashes/utils");return P(e.randomBytes(t))}:It=null,null==St&&(St=It)),St}function vt(){return null==Ot&&kt(),xt()}function At(t){return null==Tt&&kt(),Tt?Tt.apply(void 0,t):h("fetch not available",t.Logger.errors.UNSUPPORTED_OPERATION,{operation:"fetch"})}function Pt(){return null==Ot&&kt(),null==Ot?h("crypto not available",t.Logger.errors.UNSUPPORTED_OPERATION,{operation:"crypto.pbkdf2"}):("browser"===Ot?Ct=function(t,e,i,s,r){const n=self.crypto||window.crypto;return n.subtle.importKey("raw",e,{name:"PBKDF2"},!1,["deriveBits"]).then((o=>{return n.subtle.deriveBits({name:"PBKDF2",salt:e,iterations:s,hash:r(t)},o,8*i)})).then((t=>{return new Uint8Array(t)}))}:"node"===Ot?Ct=function(t,e,i,s,r){const n=require("crypto"),o=r(t);return new Promise(((t,r)=>{n.pbkdf2(e,n.createHash(o).update(e).digest(),s,i,o,((e,i)=>{e?r(e):t(i)}))}))}:"noble"===Ot?Ct=async function(t,e,i,s,r){const n=require("@noble/hashes/pbkdf2"),o=require("@noble/hashes/sha256");const a={sha256:o.sha256,sha512:o.sha512};return n.pbkdf2Async(a[r(t)],e,e,{c:s,dkLen:i})}:Ct=null),Ct}function Nt(t,e,i,s,r){return null==Ot&&kt(),null==Ct&&Pt(),Ct?Ct(t,e,i,s,r):h("pbkdf2 not available",t.Logger.errors.UNSUPPORTED_OPERATION,{operation:"pbkdf2"})}function Ut(t,e,i){return null==Ot&&kt(),null==Et?Et="noble"===Ot?async function(t,e,i){const s=require("@noble/hashes/hmac"),r=require("@noble/hashes/sha256");const n={sha256:r.sha256,sha512:r.sha512};return s.hmac(n[i(t)],e,e)}:"browser"===Ot?async function(t,e,i){const s=self.crypto||window.crypto,r=i(t);const n=await s.subtle.importKey("raw",e,{name:"HMAC",hash:{name:r}},!1,["sign"]);const o=await s.subtle.sign("HMAC",n,e);return P(new Uint8Array(o))}:"node"===Ot?async function(t,e,i){const s=require("crypto"),r=i(t);return s.createHmac(r,e).update(e).digest()}:void h("unsupported hmac",t.Logger.errors.UNSUPPORTED_OPERATION,{operation:"hmac",platform:Ot}):Et(t,e,i)}var Rt=Object.freeze({__proto__:null, randomBytes:vt, getUrl:async function(t,e){const i=await At([t,e]),s=i.headers.get("content-type");return{statusCode:i.status,statusMessage:i.statusText,headers:i.headers,body:P(await i.arrayBuffer())}}, _fetchData:At, computeHmac:Ut, keccak256:function(t){const e=require("@noble/hashes/sha3").keccak_256;return"0x"+e(N(t).data)}, pbkdf2:Nt, ripemd160:function(t){const e=require("@noble/hashes/ripemd160");return"0x"+e.ripemd160(N(t).data)}, scrypt:async function(t,e,i,s,r,n){const o=require("@noble/hashes/scrypt");return"0x"+o.scrypt(N(t).data,N(e).data,{N:i,r:s,p:r,dkLen:n})}, scryptSync:function(t,e,i,s,r,n){const o=require("@noble/hashes/scrypt");return"0x"+o.scrypt(N(t).data,N(e).data,{N:i,r:s,p:r,dkLen:n})}, sha256:function(t){const e=require("@noble/hashes/sha256");return"0x"+e.sha256(N(t).data)}, sha512:function(t){const e=require("@noble/hashes/sha512");return"0x"+e.sha512(N(t).data)}});function Lt(t,e,i){const s={value:t};return s.negative=e,s.width=i,s}function Mt(t,e){const i={value:t};return i.width=e,i}function Dt(t){return!!t.negative}function Ft(t,e){return!!t.toTwos}function $t(t,e){const i=t.value.slice();if(t.negative){for(let s=0;s<i.length;s++)i[s]=255-i[s];for(let s=0;s<i.length;s++)if(i[s]=(i[s]+1)%256,i[s]){break}}return i}const Bt={};let Gt;const zt={};let Vt;const jt={};let Wt,qt,Ht,Jt,Zt,Kt,Qt,Xt,Yt;function te(){Zt||(Zt=d.getProvider("default"))}function ee(){Yt||(Yt=d.getResolver("default"))}class ie{constructor(t){H.checkNew(this,ie),t&&H.checkAbstract(this,ie)}async getBalance(t,e){return te(),Zt.getBalance(t,e)}async getCode(t,e){return te(),Zt.getCode(t,e)}async getStorageAt(t,e,i){return te(),Zt.getStorageAt(t,e,i)}async getTransactionCount(t,e){return te(),Zt.getTransactionCount(t,e)}async getBlock(t){return te(),Zt.getBlock(t)}async getBlockWithTransactions(t){return te(),Zt.getBlockWithTransactions(t)}async getLogs(t){return te(),Zt.getLogs(t)}async getTransaction(t){return te(),Zt.getTransaction(t)}async getTransactionReceipt(t){return te(),Zt.getTransactionReceipt(t)}async call(t,e){return te(),Zt.call(t,e)}async estimateGas(t){return te(),Zt.estimateGas(t)}async getGasPrice(){return te(),Zt.getGasPrice(t)}async getFeeData(){return te(),Zt.getFeeData()}async resolveName(t){return ee(),Yt.resolveName(t)}async lookupAddress(t){return ee(),Yt.lookupAddress(t)}async getNetwork(){return te(),Zt.getNetwork()}async getBlockNumber(){return te(),Zt.getBlockNumber()}async getEtherPrice(){return te(),Zt.getEtherPrice()}async waitForTransaction(t,e,i){return te(),Zt.waitForTransaction(t,e,i)}on(t,e){return te(),Zt.on(t,e)}once(t,e){return te(),Zt.once(t,e)}emit(t,...e){return te(),Zt.emit(t,...e)}listenerCount(t){return te(),Zt.listenerCount(t)}listeners(t){return te(),Zt.listeners(t)}off(t,e){return te(),Zt.off(t,e)}removeAllListeners(t){return te(),Zt.removeAllListeners(t)}get pollingInterval(){return te(),Zt.pollingInterval}get polling(){return te(),Zt.polling}set polling(t){te(),Zt.polling=t}static getNetwork(t){return Zt.getNetwork(t)}}class se extends ie{constructor(){super(),H.checkNew(this,se)}}const re="function"==typeof Object.freeze?Object.freeze:function(t){return t};function ne(t,e){return e&&re(t),t}var oe,ae,ce;!function(t){t.UNKNOWN=0,t.UNCONFIGURED=1,t.CONFIGURED=2,t.READY=4}(oe||(oe={})),function(t){t.send="send",t.call="call",t.getBalance="getBalance",t.getTransactionCount="getTransactionCount",t.getCode="getCode",t.getStorageAt="getStorageAt",t.getLogs="getLogs",t.getBlock="getBlock",t.getTransaction="getTransaction",t.getTransactionReceipt="getTransactionReceipt",t.estimateGas="estimateGas",t.getGasPrice="getGasPrice",t.getFeeData="getFeeData"}(ae||(ae={})),function(t){t.UNKNOWN=0,t.INITIALIZE=1,t.RETRY=2,t.NEXT=3}(ce||(ce={}));const ue={};let le;const he={};let fe;const de={};let pe;const ge={};let me;const ye={};let we;let _e;const be={};let Ie;let Oe;let Se;class Ce{constructor(t){H.checkNew(this,Ce),re(this)}async getBalance(t,e){const i=await this.getResolver("getBalance");try{const s=await i.provider.getBalance(t,e);return i.result=s.toString(),i.running=this.running,s}catch(t){throw i.error=t,i.running=this.running,this.checkError("getBalance",t),t}}async getTransactionCount(t,e){const i=await this.getResolver("getTransactionCount");try{const s=await i.provider.getTransactionCount(t,e);return i.result=s,i.running=this.running,s}catch(t){throw i.error=t,i.running=this.running,this.checkError("getTransactionCount",t),t}}async getCode(t,e){const i=await this.getResolver("getCode");try{const s=await i.provider.getCode(t,e);return i.result=s,i.running=this.running,s}catch(t){throw i.error=t,i.running=this.running,this.checkError("getCode",t),t}}async getStorageAt(t,e,i){const s=await this.getResolver("getStorageAt");try{const r=await s.provider.getStorageAt(t,e,i);return s.result=r,s.running=this.running,r}catch(t){throw s.error=t,s.running=this.running,this.checkError("getStorageAt",t),t}}async call(t,e){const i=await this.getResolver("call");try{const s=await i.provider.call(t,e);return i.result=s,i.running=this.running,s}catch(t){throw i.error=t,i.running=this.running,this.checkError("call",t),t}}async estimateGas(t){const e=await this.getResolver("estimateGas");try{const i=await e.provider.estimateGas(t);return e.result=i.toString(),e.running=this.running,i}catch(t){throw e.error=t,e.running=this.running,this.checkError("estimateGas",t),t}}async getBlock(t,e){const i=await this.getResolver("getBlock");try{const s=await i.provider.getBlock(t,e);return i.result=JSON.stringify(s),i.running=this.running,s}catch(t){throw i.error=t,i.running=this.running,this.checkError("getBlock",t),t}}async getTransaction(t){const e=await this.getResolver("getTransaction");try{const i=await e.provider.getTransaction(t);return e.result=JSON.stringify(i),e.running=this.running,i}catch(t){throw e.error=t,e.running=this.running,this.checkError("getTransaction",t),t}}async getTransactionReceipt(t){const e=await this.getResolver("getTransactionReceipt");try{const i=await e.provider.getTransactionReceipt(t);return e.result=JSON.stringify(i),e.running=this.running,i}catch(t){throw e.error=t,e.running=this.running,this.checkError("getTransactionReceipt",t),t}}async getLogs(t){const e=await this.getResolver("getLogs");try{const i=await e.provider.getLogs(t);return e.result=JSON.stringify(i),e.running=this.running,i}catch(t){throw e.error=t,e.running=this.running,this.checkError("getLogs",t),t}}async getFeeData(){const t=await this.getResolver("getFeeData");try{const e=await t.provider.getFeeData();return t.result=JSON.stringify(e),t.running=this.running,e}catch(e){throw t.error=e,t.running=this.running,this.checkError("getFeeData",e),e}}getResolver(t){return{provider:this,call:t,result:null,error:null}}checkError(t,e){}}class Te{constructor(){throw new Error("cannot instantiate a static class")}}class Ee extends Te{}class ke{constructor(t,e,i){t instanceof l?Object.defineProperties(this,{name:{enumerable:!0,value:t.code},code:{enumerable:!0,value:t.code},message:{enumerable:!0,value:t.reason}}):Object.defineProperties(this,{name:{enumerable:!0,value:"unknown"},message:{enumerable:!0,value:e}}),i&&Object.defineProperties(this,i)}}class xe extends se{}class ve extends se{}let Ae;class Pe{constructor(){throw new Error("cannot instantiate a static class")}}class Ne extends ie{constructor(t){super(),this.provider=t}}class Ue{constructor(t){H.checkNew(this,Ue),re(this)}async sendTransaction(t){return H.throwError("sub-classes must implement this",t.Logger.errors.UNSUPPORTED_OPERATION,{operation:"sendTransaction"})}async getAddress(){return this._getAddress()}async signMessage(t){return H.throwError("sub-classes must implement this",t.Logger.errors.UNSUPPORTED_OPERATION,{operation:"signMessage"})}async signTransaction(t){return H.throwError("sub-classes must implement this",t.Logger.errors.UNSUPPORTED_OPERATION,{operation:"signTransaction"})}async connect(t){return H.throwError("sub-classes must implement this",t.Logger.errors.UNSUPPORTED_OPERATION,{operation:"connect"})}static isSigner(t){return!(!t||!t._isSigner)}}class Re extends Ue{constructor(t,e){super(),H.checkNew(this,Re),re(this),this.address=t,this.provider=e}async getAddress(){return this.address}connect(t){return H.throwError("cannot alter connections of a JsonRpcSigner",t.Logger.errors.UNSUPPORTED_OPERATION,{operation:"connect"})}async sendTransaction(t){const e=await this.provider.send("eth_sendTransaction",[await this.populateTransaction(t)]);return await this.provider._wrapTransaction(this.provider.formatter.transaction(e),null,1)}async signMessage(t){const e=N(t).data,i=await this.provider.send("personal_sign",[function(t){const e=new Uint8Array(t.length);return t.forEach(((i,s)=>{e[s]=t.charCodeAt(s)})),e},this.address]);return i}async _signTypedData(t,e,i){return await this.provider.send("eth_signTypedData_v4",[this.address,JSON.stringify(i)])}}class Le extends Ue{constructor(t,e){super(),H.checkNew(this,Le),re(this),this.provider=t,null!=e&&(e=e.toLowerCase()),this.index=e}getAddress(){return this.provider.send("eth_accounts",[]).then((t=>this.index<t.length?t[this.index]:H.throwError("unknown account #"+this.index,t.Logger.errors.UNSUPPORTED_OPERATION,{operation:"getAddress"})))}connect(e){const i=new Le(e,this.index);return i.provider||H.throwError("invalid provider",t.Logger.errors.INVALID_ARGUMENT,{arg:"provider",value:e}),i}async sendUncheckedTransaction(t){t=function(t){const e={};return Object.keys(t).forEach((i=>{e[i]=t[i]})),e}(t);const e=this.provider.formatter.transactionRequest(t);return null==e.from&&(e.from=this.getAddress()),await this.provider.send("eth_sendTransaction",[e])}async signTransaction(t){t=function(t){const e={};return Object.keys(t).forEach((i=>{e[i]=t[i]})),e}(t);const e=this.provider.formatter.transactionRequest(t);return null==e.from&&(e.from=this.getAddress()),await this.provider.send("eth_signTransaction",[e])}async sendTransaction(e){const i=await this.sendUncheckedTransaction(e);if(null==e.nonce){const s=await i;const r=await this.provider.getTransaction(s);try{await this.provider.waitForTransaction(r.hash,1)}catch(e){if(e.code!==t.Logger.errors.TIMEOUT)throw e;return i}}return i}async signMessage(e){const i=await this.getAddress(),s="string"==typeof e?e:e;return await this.provider.send("personal_sign",[s,i.toLowerCase()])}async _signTypedData(e,i,s){const r=await this.getAddress(),n=function(t){const e={};return Object.keys(t).forEach((i=>{e[i]=t[i]})),e}(s);return await this.provider.send("eth_signTypedData_v4",[r.toLowerCase(),n])}async unlock(e){const i=this.provider;const s=await this.getAddress();return i.send("personal_unlockAccount",[s.toLowerCase(),e,null])}}class Me{constructor(t,e,i,s,r){this._isProvider=t}}class De extends Me{constructor(t,e){super(),this.provider=t,this.signer=e}}t.AbstractProvider=ie,t.AbstractSigner=Ue,t.AlchemyProvider=class extends ve{static getApiKey(t){return e("alchemy")?e("alchemy"):null}static getUrl(t,e){"string"==typeof t&&(t={name:t,chainId:null});let i=null;return i=t.name,"homestead"===i&&(i="mainnet"),i+="/v2/"+e}},t.AnkrProvider=class extends ve{static getApiKey(t){return e("ankr")?e("ankr"):null}static getUrl(t,e){"string"==typeof t&&(t={name:t,chainId:null});let i=null;switch(t.name){case"homestead":i="rpc.ankr.com/eth";break;case"matic":i="rpc.ankr.com/polygon";break;case"arbitrum":i="rpc.ankr.com/arbitrum";break;default:return null}return"https://"+i+(e?"/"+e:"")}},t.BaseProvider=se,t.BigNumber=C,t.Block=class{constructor(t,e){this.provider=t}},t.CloudflareProvider=class extends xe{static getUrl(t){return"string"==typeof t&&(t={name:t,chainId:null}),"homestead"===t.name?"https://cloudflare-eth.com/":"homestead"!==t.name&&H.throwError("unsupported network",t.Logger.errors.UNSUPPORTED_OPERATION,{network:t.name}),null}},t.CommunityResourcable=Te,t.Contract=class{constructor(t,e,i){i&&Ue.isSigner(i)?(this.provider=i.provider,this.signer=i):i&&ie.isProvider(i)?(this.provider=i,this.signer=null):this.signer=this.provider=null}},t.ContractFactory=class{constructor(t,e,i){this.bytecode="string"==typeof t?{object:t}:t}},t.EtherscanProvider=class extends xe{constructor(t,e){super(t),i(this,e)},getBaseUrl(){switch(this.network?this.network.name:"unspecified"){case"homestead":return"https://api.etherscan.io";case"ropsten":return"https://api-ropsten.etherscan.io";case"rinkeby":return"https://api-rinkeby.etherscan.io";case"kovan":return"https://api-kovan.etherscan.io";case"goerli":return"https://api-goerli.etherscan.io";case"matic":return"https://api.polygonscan.com";case"maticmum":return"https://api-testnet.polygonscan.com";case"arbitrum":return"https://api.arbiscan.io";case"arbitrum-goerli":return"https://api-goerli.arbiscan.io";case"optimism":return"https://api-optimistic.etherscan.io";case"optimism-kovan":return"https://api-kovan-optimistic.etherscan.io";case"optimism-goerli":return"https://api-goerli-optimistic.etherscan.io";case"avalanche":return"https://api.snowtrace.io";case"avalanche-fuji":return"https://api-testnet.snowtrace.io";case"bnb":return"https://api.bscscan.com";case"bnbt":return"https://api-testnet.bscscan.com"}return H.throwArgumentError("unsupported network",X.Network,this.network.name)}},t.FallbackProvider=Ce,t.FeeData=class{},t.InfuraProvider=class extends ve{static getApiKey(t){const r={projectId:e("infura")||void 0,projectSecret:s("infura")||void 0};return r.projectId&&r.projectSecret?r:r.projectId?r.projectId:null}static getUrl(t,e){let i="string"==typeof e?{projectId:e,projectSecret:null}:e,s=null;switch(t.name){case"homestead":s="mainnet.infura.io";break;case"ropsten":s="ropsten.infura.io";break;case"rinkeby":s="rinkeby.infura.io";break;case"kovan":s="kovan.infura.io";break;case"goerli":s="goerli.infura.io";break;case"matic":s="polygon-mainnet.infura.io";break;case"maticmum":s="polygon-mumbai.infura.io";break;case"arbitrum":s="arbitrum-mainnet.infura.io";break;case"arbitrum-rinkeby":s="arbitrum-rinkeby.infura.io";break;case"optimism":s="optimism-mainnet.infura.io";break;case"optimism-kovan":s="optimism-kovan.infura.io";break;default:return null}const r="https:"===document.location.protocol?"wss":"ws";return i.projectSecret?{url:"https://:"+i.projectSecret+"@"+s+"/v3/"+i.projectId,headers:{"User-Agent":function(t){let e="ethers/"+t;return"undefined"!=typeof navigator&&e+="(browser)",e}("browser")}}:"https://"+s+"/v3/"+i.projectId}},t.IpcProvider=class extends Ne{constructor(t,e){super(e),H.throwError("IPC provider has been removed due to security issues",t.Logger.errors.UNSUPPORTED_OPERATION,{operation:"new IpcProvider()"})}},t.JsonRpcProvider=class extends se{constructor(e,i){let s="string"==typeof e?e:e?e.url:null;super(s,i),this._nextId=1},getSigner(t){return new Le(this,t)},getUncheckedSigner(t){return new Re(null==t?void 0:t,this)}},t.JsonRpcSigner=Le,t.Log=class{},t.PocketProvider=class extends xe{static getApiKey(t){const e=s("pocket");return"object"==typeof e?e:{applicationId:e||void 0,applicationSecretKey:null}},static getUrl(t,e){"string"==typeof t&&(t={name:t,chainId:null});let i=null;return i=null,"homestead"===t.name?i="eth-mainnet.gateway.pokt.network/v1/lb/"+e:"ropsten"===t.name?i="eth-ropsten.gateway.pokt.network/v1/lb/"+e:"rinkeby"===t.name?i="eth-rinkeby.gateway.pokt.network/v1/lb/"+e:"goerli"===t.name&&(i="eth-goerli.gateway.pokt.network/v1/lb/"+e),"https:"===document.location.protocol?{url:"https://"+i,headers:{}}:{url:"http://"+i,headers:{}}}},t.Provider=ie,t.Signer=Ue,t.SocketProvider=class extends se{constructor(t,e){super(t,e),H.throwError("SocketProvider has been removed. For websockets, use WsProvider.",t.Logger.errors.UNSUPPORTED_OPERATION,{operation:"new SocketProvider()"})}},t.StaticJsonRpcProvider=class extends(t.JsonRpcProvider){async detectNetwork(){let t=this.network;if(null==t){const e=await this.send("eth_chainId",[]);t=p(parseInt(e))}(t.chainId===this.network.chainId&&t.name===this.network.name)||H.throwError("underlying network changed",t.Logger.errors.NETWORK_ERROR,{event:"changed",network:this.network,detectedNetwork:t});const e=await super.detectNetwork();if(t.chainId!==e.chainId)throw new Error("BOOM");return t}},t.StaticSigner=class extends Ue{constructor(t){super(),re(this)}},t.TestProvider=class extends Le{constructor(t,e){super(e,t)}},t.Transaction=class{},t.UrlJsonRpcProvider=class extends(t.JsonRpcProvider){constructor(t,e){"number"==typeof t&&H.throwError("UrlJsonRpcProvider requires a connection object",t.Logger.errors.INVALID_ARGUMENT,{argument:"network",value:t}),super(t,e)}},t.VoidSigner=class extends Ue{constructor(t,e){super(),re(this),this.address=t,this.provider=e}},t.Wallet=class extends Ue{constructor(e,i){super(),this.provider=i,S(e)?this.privateKey="0x"===e.substring(0,2)?e:"0x"+e:this.mnemonic=e,this.address=this.getAddress()},get mnemonic(){return this.mnemonic},get privateKey(){return this.privateKey},get publicKey(){return s(this.privateKey)},getAddress(){return r(this.publicKey)},connect(t){return new(e())(this,t)}},t.WebSocketProvider=class extends(t.JsonRpcProvider){constructor(t,e){super(t,e)}},t.getDefaultProvider=function(e,i){const s=[];"string"==typeof e?e=p(e):null==e&&(e=p("homestead"));const r=e.name;function n(t,e,i){const s=new t(e,i);return s.on("debug",(t=>{})),s}if(i&&i.alchemy){try{s.push(n(t.AlchemyProvider,e,i.alchemy))}catch(t){}}if(i&&i.ankr){try{s.push(n(t.AnkrProvider,e,i.ankr))}catch(t){}}if(i&&i.etherscan){try{s.push(n(t.EtherscanProvider,e,i.etherscan))}catch(t){}}if(i&&i.infura){let r=i.infura;"object"==typeof r&&r.projectId&&r.projectSecret||(r={projectId:r});try{s.push(n(t.InfuraProvider,e,r))}catch(t){}}if(i&&i.pocket){let r=i.pocket;"object"==typeof r&&r.applicationId||(r={applicationId:r,applicationSecretKey:i.pocketSecretKey||null});try{s.push(n(t.PocketProvider,e,r))}catch(t){}}return i&&i.quorum&&"number"==typeof i.quorum?s.length>=i.quorum?1===s.length?s[0]:new Ce(s,i.quorum):H.throwError("insufficient providers for quorum",t.Logger.errors.INVALID_ARGUMENT,{argument:"providers",value:s,count:s.length,quorum:i.quorum}):1===s.length?s[0]:new Ce(s)},t.Wordlist=class{},t.defaultAbiCoder=new(class extends class{constructor(t){this.coerceFunc=t}coerce(t,e){const i=this.coerceFunc;return i?i(t,e):t}}{coalesceType(t){switch(t){case"int":return"int256";case"uint":return"uint256"}return t}})((function(t,e){return"array"===t&&(e=JSON.parse(e)),e})),t.getNetwork=p,t.isCommunityResource=function(t){return"string"==typeof t&&!!t.match(/^dev-rel-.*$/)},t.isAddress=function(t){try{return!!i(t)}catch(t){return!1}},t.isHexString=function(t,e){if(!S(t))return!1;if(null==e)return!0;if(t.length!==2+2*e)return!1;return!0},t.isBytes=function(t){return!(!t||!t._isBytes||!t.length)},t.isBytesLike=function(t){if(null==t)return!1;if(t._isBytes)return!0;if("string"==typeof t)return!(!S(t)||t.length%2);if(t.length)return!0;return!1},t.isCallException=function(t){return t.code===l.errors.CALL_EXCEPTION},t.isCrowdsaleAccount=function(t){return!1},t.isBigNumberish=function(e){return null!=e&&("number"==typeof e&&e%1==0||"string"==typeof e&&!!e.match(/^-?[0-9]+$/)||t.isHexString(e)||t.isBigNumber(e)||t.isBytes(e))},t.isBigNumber=function(t){return!(!t||!t._isBigNumber)},t.version=r,t.utils=rt,Object.defineProperty(t,"__esModule",{value:!0})}));

/**
 * @web3modal/standalone v3.5.0
 * (c) 2023 Web3Modal
 * Released under the Apache-2.0 License.
 */

var a={};Object.defineProperty(a,"__esModule",{value:!0});var o,d=require("@web3modal/core");const h=d.VERSION;function C(e,t,r,n,i,l,s){try{var a=e[l](s),o=a.value}catch(e){return void r(e)}a.done?t(o):Promise.resolve(o).then(n,i)}function p(e){return function(){var t=this,r=arguments;return new Promise((function(n,i){var l=e.apply(t,r);function s(e){C(l,n,i,s,c,"next",e)}function c(e){C(l,n,i,s,c,"throw",e)}s(void 0)}))}}const f={projectId:d.ConfigCtrl.state.projectId,walletConnectVersion:d.OptionsCtrl.state.walletConnectVersion,themeMode:d.ThemeCtrl.state.themeMode,themeVariables:d.ThemeCtrl.state.themeVariables,allWallets:d.OptionsCtrl.state.allWallets,includeWalletIds:d.OptionsCtrl.state.includeWalletIds,excludeWalletIds:d.OptionsCtrl.state.excludeWalletIds,featuredWalletIds:d.OptionsCtrl.state.featuredWalletIds,defaultChain:d.ChainCtrl.state.activeChain,chains:d.ChainCtrl.state.chains,explorerRecommendedWalletIds:d.OptionsCtrl.state.explorerRecommendedWalletIds,explorerExcludedWalletIds:d.OptionsCtrl.state.explorerExcludedWalletIds,termsOfServiceUrl:d.OptionsCtrl.state.termsOfServiceUrl,privacyPolicyUrl:d.OptionsCtrl.state.privacyPolicyUrl};class m{constructor(e){var t=this;this.openModal=p((function(){return t.modal.open()})),this.closeModal=p((function(){return t.modal.close()})),this.subscribeModal=function(e){return t.modal.subscribe(e)},this.setTheme=function(e){return t.modal.setTheme(e)},this.modal=new d.ModalCtrl(Object.assign(Object.assign({},f),e))}}Object.defineProperty(a,"Web3Modal",{enumerable:!0,get:function(){return m}}),o=a,window.Web3Modal=o;
//# sourceMappingURL=index.umd.js.map

document.addEventListener('DOMContentLoaded', () => {
    console.log("WagyDog script.js loaded and running!"); // You should see this in the console

    // --- Mobile menu toggle ---
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // --- Scroll-in animations ---
    const fadeInSections = document.querySelectorAll('.fade-in-section');
    if (fadeInSections.length > 0) {
        console.log(`Found ${fadeInSections.length} sections to animate.`); // You should see this
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        fadeInSections.forEach(section => {
            observer.observe(section);
        });
    } else {
        console.log("No sections with '.fade-in-section' found to observe.");
    }

    // --- Starfield Animation ---
    function createStarfield(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let stars = [];
        let numStars = 250;

        function resizeCanvas() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            stars = [];
            for (let i = 0; i < numStars; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 1.5 + 0.5,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3
                });
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#fff";
            for (let i = 0, x = stars.length; i < x; i++) {
                let s = stars[i];
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
                ctx.fill();
                s.x += s.vx;
                s.y += s.vy;
                if (s.x < 0 || s.x > canvas.width) s.vx = -s.vx;
                if (s.y < 0 || s.y > canvas.height) s.vy = -s.vy;
            }
            requestAnimationFrame(animate);
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        animate();
    }

    createStarfield('starfield');
    createStarfield('starfield2');

    // --- Wallet Connection Logic ---
    const web3Modal = new window.Web3Modal.Standalone({
        projectId: 'F177ccc83d51024d30957d2135be7ac0',
        walletConnectVersion: 2,
        chains: [97], // BSC Testnet
    });

    window.wagyDog = {
        provider: null,
        signer: null,
        address: null,
        getWalletState: function() {
            return {
                provider: this.provider,
                signer: this.signer,
                address: this.address
            };
        }
    };

    function updateUi(address) {
        const allConnectButtons = document.querySelectorAll('#header-connect-btn, #mobile-connect-btn, #dashboard-connect-btn, #swap-action-btn');
        const connectedInfo = document.getElementById('wallet-connected-info');
        const walletAddressSpan = document.getElementById('wallet-address');
        const disconnectBtn = document.getElementById('disconnect-btn');
        const mintBtn = document.getElementById('mint-nft-btn');
        const connectionPrompt = document.getElementById('wallet-connection-info');
        const swapActionButton = document.getElementById('swap-action-btn');

        if (address) {
            const shortAddress = `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
            allConnectButtons.forEach(btn => btn.textContent = shortAddress);
            if (swapActionButton) swapActionButton.textContent = 'Swap';
            if (walletAddressSpan) walletAddressSpan.textContent = shortAddress;
            if (connectedInfo) connectedInfo.classList.remove('hidden');
            if (disconnectBtn) disconnectBtn.classList.remove('hidden');
            if (connectionPrompt) connectionPrompt.classList.add('hidden');
            if (mintBtn) mintBtn.disabled = false;
        } else {
            allConnectButtons.forEach(btn => btn.textContent = 'Connect Wallet');
            if (swapActionButton) swapActionButton.textContent = 'Connect Wallet';
            if (connectedInfo) connectedInfo.classList.add('hidden');
            if (disconnectBtn) disconnectBtn.classList.add('hidden');
            if (connectionPrompt) connectionPrompt.classList.remove('hidden');
            if (mintBtn) mintBtn.disabled = true;
        }
    }

    async function connectWallet() {
        try {
            const provider = await web3Modal.connect();
            window.wagyDog.provider = new ethers.providers.Web3Provider(provider);
            window.wagyDog.signer = window.wagyDog.provider.getSigner();
            window.wagyDog.address = await window.wagyDog.signer.getAddress();
            console.log("Wallet connected:", window.wagyDog.address);
            updateUi(window.wagyDog.address);
            provider.on("accountsChanged", (accounts) => {
                if (accounts.length > 0) {
                    connectWallet();
                } else {
                    disconnectWallet();
                }
            });
            provider.on("chainChanged", () => window.location.reload());
        } catch (error) {
            console.error("Could not connect to wallet:", error);
            disconnectWallet();
        }
    }

    function disconnectWallet() {
        window.wagyDog.provider = null;
        window.wagyDog.signer = null;
        window.wagyDog.address = null;
        console.log("Wallet disconnected.");
        updateUi(null);
    }

    document.querySelectorAll('#header-connect-btn, #mobile-connect-btn, #dashboard-connect-btn, #swap-action-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.textContent.includes('Connect Wallet')) {
                connectWallet();
            }
        });
    });

    const disconnectBtn = document.getElementById('disconnect-btn');
    if (disconnectBtn) {
        disconnectBtn.addEventListener('click', disconnectWallet);
    }

    // --- NFT Marketplace Logic ---
    const mintBtn = document.getElementById('mint-nft-btn');
    const nftGallery = document.getElementById('nft-gallery');
    const marketplaceContractAddress = "0x236237354Cef68d1EC34674dBD43e429AdA0d969";
    const marketplaceContractABI = [ /* Full ABI goes here */
        {"inputs":[],"stateMutability":"nonpayable","type":"constructor"},
        {"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address","name":"owner","type":"address"}],"name":"ERC721IncorrectOwner","type":"error"},
        {"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ERC721InsufficientApproval","type":"error"},
        {"inputs":[{"internalType":"address","name":"approver","type":"address"}],"name":"ERC721InvalidApprover","type":"error"},
        {"inputs":[{"internalType":"address","name":"operator","type":"address"}],"name":"ERC721InvalidOperator","type":"error"},
        {"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"ERC721InvalidOwner","type":"error"},
        {"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"ERC721InvalidReceiver","type":"error"},
        {"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"ERC721InvalidSender","type":"error"},
        {"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ERC721NonexistentToken","type":"error"},
        {"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},
        {"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},
        {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},
        {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},
        {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},
        {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},
        {"inputs":[],"name":"MAX_SUPPLY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
        {"inputs":[],"name":"MINT_PRICE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
        {"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},
        {"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
        {"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},
        {"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},
        {"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"mint","outputs":[],"stateMutability":"payable","type":"function"},
        {"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},
        {"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},
        {"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},
        {"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},
        {"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},
        {"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},
        {"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},
        {"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},
        {"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},
        {"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},
        {"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},
        {"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},
        {"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}
    ];
    
    async function mintNFT() {
        const { signer, address } = window.wagyDog.getWalletState();
        if (!signer) return alert('Please connect your wallet first.');
        const contract = new ethers.Contract(marketplaceContractAddress, marketplaceContractABI, signer);
        let mintPrice;
        try {
            mintPrice = await contract.MINT_PRICE();
        } catch (e) {
            console.error("Could not fetch mint price from contract.", e);
            return alert("Error: Could not fetch mint price.");
        }
        mintBtn.disabled = true;
        mintBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Processing...';
        try {
            const tx = await contract.mint(address, { value: mintPrice });
            await tx.wait();
            alert('Mint successful!');
        } catch (error) {
            console.error("Minting failed:", error);
            alert('Minting failed. Check console for details.');
        } finally {
            mintBtn.disabled = false;
            mintBtn.innerHTML = '<i class="fas fa-star mr-2"></i> Mint Now';
        }
    }

    const dummyNfts = [
        { id: 1, name: 'Cosmic Wagy', artist: 'Galaxy Paws', price: '0.1', image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: 2, name: 'Nebula Pup', artist: 'Starlight Studio', price: '0.25', image: 'https://images.pexels.com/photos/1665241/pexels-photo-1665241.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: 3, name: 'Star Chaser', artist: 'Andromeda Art', price: '0.5', image: 'https://images.pexels.com/photos/4587993/pexels-photo-4587993.jpeg?auto=compress&cs=tinysrgb&w=600' },
    ];
    const createNftCard = (nft) => `<div class="nft-card"><img src="${nft.image}" alt="${nft.name}" class="nft-card-image"><div class="nft-card-content"><h4 class="nft-card-title">${nft.name} #${nft.id}</h4><p class="nft-card-artist">by ${nft.artist}</p></div><div class="nft-card-footer"><span class="text-sm text-gray-400">Price</span><span class="font-bold text-white">${nft.price} BNB</span></div></div>`;
    if (nftGallery) nftGallery.innerHTML = dummyNfts.map(createNftCard).join('');
    if (mintBtn) mintBtn.addEventListener('click', mintNFT);

    // --- Swap Logic ---
    const fromAmountInput = document.getElementById('from-amount');
    const toAmountInput = document.getElementById('to-amount');
    const fromTokenSelect = document.getElementById('from-token-select');
    const toTokenSelect = document.getElementById('to-token-select');
    const swapDirectionBtn = document.getElementById('swap-direction-btn');
    const swapActionButton = document.getElementById('swap-action-btn');

    let fromToken = { name: 'BNB', logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png' };
    let toToken = { name: 'WAGY', logo: 'wagydog-logo.jpg' };
    const BNB_TO_WAGY_RATE = 1500000;

    function updateTokenDisplay(buttonElement, token) {
        if (!buttonElement) return;
        buttonElement.querySelector('.token-logo').src = token.logo;
        buttonElement.querySelector('.token-logo').alt = token.name;
        buttonElement.querySelector('.token-name').textContent = token.name;
    }

    function handleSwapDirection() {
        [fromToken, toToken] = [toToken, fromToken];
        [fromAmountInput.value, toAmountInput.value] = [toAmountInput.value, fromAmountInput.value];
        updateTokenDisplay(fromTokenSelect, fromToken);
        updateTokenDisplay(toTokenSelect, toToken);
    }

    function handleAmountChange(e) {
        const inputAmount = parseFloat(e.target.value);
        if (isNaN(inputAmount) || inputAmount <= 0) {
            toAmountInput.value = '';
            if (e.target.id === 'to-amount') fromAmountInput.value = '';
            return;
        }
        const rate = (fromToken.name === 'BNB') ? BNB_TO_WAGY_RATE : 1 / BNB_TO_WAGY_RATE;
        if (e.target.id === 'from-amount') {
            toAmountInput.value = (inputAmount * rate).toString();
        } else {
            fromAmountInput.value = (inputAmount / rate).toString();
        }
    }
    
    async function performSwap() {
        const { signer } = window.wagyDog.getWalletState();
        if (!signer) return alert('Please connect your wallet to perform a swap.');
        const fromAmount = fromAmountInput.value;
        if (!fromAmount || parseFloat(fromAmount) <= 0) return alert('Please enter a valid amount to swap.');
        alert("Swap functionality is a simulation.");
        // Actual swap logic with a router contract would go here.
    }

    if (swapDirectionBtn) swapDirectionBtn.addEventListener('click', handleSwapDirection);
    if (fromAmountInput) fromAmountInput.addEventListener('input', handleAmountChange);
    if (toAmountInput) toAmountInput.addEventListener('input', handleAmountChange);
    if (swapActionButton) {
        swapActionButton.addEventListener('click', () => {
            if (swapActionButton.textContent.trim() === "Swap") {
                performSwap();
            }
        });
    }

    updateTokenDisplay(fromTokenSelect, fromToken);
    updateTokenDisplay(toTokenSelect, toToken);
});
