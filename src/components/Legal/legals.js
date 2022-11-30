import { useTranslation } from "react-i18next";
import './legals.scss';

function Legals() {
  const { t } = useTranslation('common');

  return (
    <div className="content">
      <span className="lastUpdate">Dernière mise à jour le 9 Juillet 2020 • <button>Versions archivées</button></span>
      <h1>{t("legals.title")}</h1>
      <span>
      Conformément aux dispositions des articles 6-III et 19 de la Loi n° 2004-575 du 21 juin 2004 pour la Confiance dans
      l'économie numérique, dite L.C.E.N., nous portons à la connaissance des utilisateurs et visiteurs du site : www.newbrands.fr
      les informations suivantes :
      </span>

      <div className="dottedHr"></div>

      <h3>Éditeur</h3>
      <p>
        Le site www.newbrands.fr est la propriété exclusive de la <b>SAS NEWBRANDS.FR</b>, qui l'édite.
      </p>
      <p>
        <b>NEWBRANDS.FR</b><br/>
        SAS au capital de 81 000.00 EUR<br/>
        Tél  : 01 76 40 14 43
      </p>
      <p>
        <b>Siège social :</b> 10 Place Vendôme 75001 Paris<br/>
        Société Immatriculée au Registre du Commerce et des Sociétés de Paris sous le numéro 829 419 100 00021<br/>
        <b>Numéro TVA intracommunautaire :</b> FR23829419100<br/>
        <b>Adresse de courrier électronique :</b> sales@newbrands.fr<br/>
        <b>Directeur de la  publication :</b> Maxime NICOLAS<br/>
        <b>Contactez le responsable de la publication :</b> m.nicolas@newbrands.fr<br/>
      </p>

      <h3>Hébergement</h3>
      <p>
        Le site est hébergé par : <b>OVH CLOUD</b><br/>
        <b>Siège social de l’hébergeur :</b> 2 rue Kellermann 59100 Roubaix
      </p>

      <h3>Description des services fournis</h3>
      <p>
      Le site <span>www.newbrands.fr</span> a pour objet de fournir une information concernant l’ensemble des activités de la
      société. Le proprietaire du site s’efforce de fournir sur le site <span>www.newbrands.fr</span> des informations aussi précises
      que possible.<br/><br/>

      Toutefois, il ne pourra être tenue responsable des omissions, des inexactitudes et des carences dans la mise à jour, qu’elles
      soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.<br/><br/>

      Tous les informations proposées sur le site <span>www.newbrands.fr</span> sont données à titre indicatif, sont non exhaustives,
      et sont susceptibles d’évoluer. Elles sont données sous réserve de modifications ayant été apportées depuis leur mise en ligne.  
      </p>
      
      <h3>Propriété intellectuelle et contrefaçons</h3>
      <p>
      Le proprietaire du site est propriétaire des droits de propriété intellectuelle ou détient les droits d’usage sur tous les
      éléments accessibles sur le site, notamment les textes, images, graphismes, logo, icônes, sons, logiciels…<br/><br/>

      Toute reproduction, représentation, modification, publication, adaptation totale ou partielle des éléments du site, quel que
      soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable à
      l'email : <span>sales@newbrands.fr</span> .<br/><br/>

      Toute exploitation non autorisée du site ou de l’un quelconque de ces éléments qu’il contient sera considérée comme
      constitutive d’une contrefaçon et poursuivie conformément aux dispositions des <b>articles L.335-2 et suivants du Code
      de Propriété Intellectuelle.</b>
      </p>

      <h3>Liens hypertextes et cookies</h3>
      <p>
      Le site <span>www.newbrands.fr</span> contient un certain nombre de liens hypertextes vers d’autres sites (partenaires,
      informations …) mis en place avec l’autorisation de le proprietaire du site . Cependant, le proprietaire du site n’a pas
      la possibilité de vérifier le contenu des sites ainsi visités  et décline donc toute responsabilité de ce fait quand aux
      risques éventuels de contenus illicites. L’utilisateur est informé que lors de ses visites sur le
      site <span>www.newbrands.fr</span>, un ou des cookies sont susceptible de s’installer automatiquement sur son
      ordinateur.<br/><br/>

      Un cookie est un fichier de petite taille, qui ne permet pas l’identification de l’utilisateur, mais qui enregistre
      des informations relatives à la navigation d’un ordinateur sur un site.<br/><br/>

      Les données ainsi obtenues visent à faciliter la navigation ultérieure sur le site, et ont également vocation à permettre
      diverses mesures de fréquentation.<br/><br/>

      Le paramétrage du logiciel de navigation permet d’informer de la présence de cookie et éventuellement, de refuser de la
      manière décrite à l’adresse suivante : <span>www.cnil.fr</span><br/><br/>

      Le refus d’installation d’un cookie peut entraîner l’impossibilité d’accéder à certains services. 
      </p>

      <h3>Protection des biens et services et des personnes - gestion des données personnelles</h3>
      <p>
      Utilisateur : Internaute se connectant, utilisant le site susnommé : <span>www.newbrands.fr</span><br/>
      En France, les données personnelles sont notamment protégées par la loi <b>n° 78-87 du 6 janvier 1978, la loi n° 2004-801
      du 6 août 2004, l'article L. 226-13 du Code pénal et la Directive Européenne du 24 octobre 1995.</b><br/><br/>

      Sur le site <span>www.newbrands.fr</span>, le proprietaire du site ne collecte des informations personnelles relatives
      à l'utilisateur que pour le besoin de certains services proposés par le site <span>www.newbrands.fr</span>.<br/><br/>

      L'utilisateur fournit ces informations en toute connaissance de cause, notamment lorsqu'il procède par lui-même à leur
      saisie. Il est alors précisé à l'utilisateur du site <span>www.newbrands.fr</span> l’obligation ou non de fournir ces
      informations.<br/><br/>

      Conformément aux dispositions des <b>articles 38 et suivants de la loi 78-17 du 6 janvier 1978 relative à l’informatique,
      aux fichiers et aux libertés</b>, tout utilisateur dispose d’un droit d’accès, de rectification, de suppression et
      d’opposition aux données personnelles le concernant.<br/><br/>

      Pour l’exercer, adressez votre demande par demande écrite et signée, accompagnée d’une copie du titre d’identité avec
      signature du titulaire de la pièce, en précisant l’adresse à laquelle la réponse doit être envoyée.<br/><br/>

      Aucune information personnelle des utilisateur du site <span>www.newbrands.fr</span> n'est publiée à l'insu de l'utilisateur,
      échangée, transférée, cédée ou vendue sur un support quelconque à des tiers.<br/><br/>

      Seule l’hypothèse d’un rachat de la société SAS NEWBRANDS aux proprietaires du site et de ses droits permettrait la
      transmission des dites informations à l'éventuel acquéreur qui serait à son tour tenu de la même obligation de conservation
      et de modification des données vis à vis de l'utilisateur du site <span>www.newbrands.fr</span>.<br/><br/>

      Le site <span>www.newbrands.fr</span> est en conformité avec le RGPD voir notre politique vie
      privée <span>www.newbrands.fr/legal/privacy</span>.<br/><br/>

      Les bases de données sont protégées par les dispositions de la loi du <b>1er juillet 1998 transposant la directive 96/9 du
      11 mars 1996 relative à la protection juridique des bases de données.</b>
      </p>
    </div>
  );
}

export default Legals;
