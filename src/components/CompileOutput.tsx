import { useSubmitSources } from "../lib/useSubmitSources";
import InfoPiece from "./InfoPiece";
import { useLoadContractInfo } from "../lib/useLoadContractInfo";
import Spacer from "./Spacer";
export function CompileOutput() {
  const { data: submitSourcesData, error } = useSubmitSources();
  const { data: contractInfoData } = useLoadContractInfo();
  const compileResult = submitSourcesData?.result?.compileResult;
  const hints = submitSourcesData?.hints;
  // https://t.me/+4S9EdWndFec4MWYy
  return (
    <div>
      <h3>Result</h3>
      {["similar"].includes(compileResult?.result ?? "") && (
        <div>Hashes match</div>
      )}

      {["not_similar"].includes(compileResult?.result ?? "") && (
        <pre
          style={{
            backgroundColor: "#FC565620",
            border: "#D8D8D8 1px solid",
            padding: "10px 20px",
            borderRadius: 20,
            overflow: "auto",
            fontFamily: "inherit",
          }}
        >
          <div>
            <b>Hashes are not similar</b>
          </div>
          <Spacer space={10} />
          <InfoPiece
            label="Contract hash"
            data={contractInfoData?.hash ?? ""}
          />
          <InfoPiece
            label="Compile output hash"
            data={compileResult?.hash ?? ""}
          />
        </pre>
      )}

      {compileResult?.error && (
        <pre
          style={{
            backgroundColor: "#D8D8D830",
            border: "#D8D8D8 1px solid",
            padding: "16px 20px",
            borderRadius: 20,
            overflow: "auto",
            maxHeight: 300,
          }}
        >
          <div style={{ fontSize: 16 }}>
            <b>Compile error</b>
          </div>
          <Spacer space={10} />
          <code>{compileResult.error}</code>
        </pre>
      )}
      {error && <h4>❌ {error.toString()}</h4>}

      {hints?.length > 0 && (
        <>
          <pre
            style={{
              backgroundColor: "#5E75E80A",
              border: "#D8D8D8 1px solid",
              padding: "10px 20px",
              borderRadius: 20,
              overflow: "hidden",
              maxHeight: 300,
              whiteSpace: "pre-wrap",
              fontFamily: "inherit",
              lineHeight: 1.8,
            }}
          >
            <div>
              <b>Possible reasons for failure</b>
            </div>
            <Spacer space={10} />
            {hints?.map((h) => (
              <div key={h}>💎 {h}</div>
            ))}
          </pre>
        </>
      )}
    </div>
  );
}
