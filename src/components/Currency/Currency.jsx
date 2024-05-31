import s from "./Currency.module.css";
export const Currency = () => {
  return (
    <div className={s.currencyContainer}>
      <table className={s.currencyTable}>
        <thead className={s.tableHeader}>
          <tr className={s.headerRows}>
            <td className={s.firstCol}>Curency</td>
            <td className={s.secondCol}>Purchace</td>
            <td className={s.thirdCol}>Sale</td>
          </tr>
        </thead>
        <tbody>
          <tr className={s.bodyRows}>
            <td className={s.firstCol}>USD</td>
            <td className={s.secondCol}>20</td>
            <td className={s.thirdCol}>24</td>
          </tr>
          <tr className={s.bodyRows}>
            <td className={s.firstCol}>EUR</td>
            <td className={s.secondCol}>21</td>
            <td className={s.thirdCol}>25</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
