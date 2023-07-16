# eshop-tests

## Úvod
- Před implementací samotných testů musíme zvolit nástroj, který k tomu použijeme
- Je několik kritérií, která je potřeba brát v potaz:
   * Plánujeme spouštět testy ve všech prohlížečích nebo se spokojíme např. s Chromem, případně které jiné prohlížeče jsou pro nás důležité?
   * Musíme počítat i s omezením některých testovacích frameworků 
      - jako např. budemete testovat aplikaci ve více záložkách prohlížeče? jsou v aplikaci použity `<iframe>` elementy?
   * Budou se psaní testů kromě QAs věnovat i programátoři? 
      - pak by bylo dobré jazyk pro psaní testů sjednotit s tím, který sami používají
   * Jak budeme řešit reportování výsledků?
      - můžeme si dovolit zaplatit některé komerční řešení nebo budeme chtít používat free
   * Musíme prozkoumat náš CI/CD tool a zjistit, jak vytvořit pipeline pro jejich automatické spouštění
   * Jak často chceme testy nechat běžet? Při každém mergi/jednou denně/...?
 
## Řešení
- Vytvořil sem zjednodušený návrh řešení tak, jak by to šlo implementovat použitím Cypressu
  
1. Spouštění testů pro více než jeden eshop
   - Cypress umožňuje pomocí `Environment Variables` definovat proměnné vztahující se k jednomu prostředí a přepínat mezi nimi
   - Příklad se nachází ve složce `cypress/environments`. V souboru se nachází i informace s přístupovými údaji uživatelů, takže se s nimi můžeme přihlašovat jako uživatel s různými oprávněními
  
3. Data používaná v testech se liší, známe je ale dopředu, tedy se mezi nimi díky `Environment Variables` můžeme přepínat také. Cypress nabízí pro práci s daty command `fixture` pomocí něhož data načteme a můžeme s nimi dále pracovat
     
4. Webová aplikace obsahuje několik různých stránek a pro každou z nich vytvoříme třídu, která bude obsahovat elementy stránky, případně další potřebné metody. Třídy budou ve složce `cypress/pageObjects/`, kromě této složky existuje i `cypress/pageFragments` ve které se budou nacházet třídy s elementy, které jsou použity napříč aplikací a neváží se jen ke konkrétní stránce

5. V zadání je zmíněná stránku Profilu, která obsahuje informace o skladu, seznam zboží, zásob, přihrádek a dalších dat ve skladu e-shopu. Ta odpovídá třídě `cypress/pageObjects/Profile.js`. Pro jednoduchost předpokládám, že na této stránce se nachází všechny seznamy a údaje, ale pokud by platilo, že ze stránky profilu se dostanu na všechny ostatní stránky obsahující seznamy, pak bych stejnou třídu vytvořil pro každou z těchto stránek

6. V rámci stránky je potřeba pracovat s několika seznamy, proto byla vytvořena ještě obecná třída `List`, pro získávání řádku seznamu

7. Testovací metody pro proces příjmu a vydání zboží se nachází v souboru `cypress/e2e/test.cy.js`. V obou testovacích metodách jen přistupuju k jednotlivým seznamům položek, ale účelem je znázornit to, že lze pracovat se získanými daty a porovnávat je s tím, co se zobrazuje v aplikaci

## Věci ke zlepšení

1. Data ze seznamů, která získáváme ať už ze souboru nebo databáze by se měla mapovat do objektů, aby práce s nimi byla snažší. Takže pro všechny skladové položky typu zboží, zásoby, příhrádka by se vytvořili třídy obsahující fieldy a metody pro práci s nimi, do kterých by se získaná data namapovala

2. Třída `List` by byla `superclass` pro třídy typu `Seznam zboží`, `Seznam zásob`, `Seznam přihrádek` tyto třídy by pak měly metody specifické jen pro daný seznam

3. Zároveň by se vytvořila `superclass` pro uživatele a ostatní třídy typu manager, skladník by z ní dědili, aby měli přístup pouze k údajům (fieldům, metodám), na které mají opravnění
   
   
   
