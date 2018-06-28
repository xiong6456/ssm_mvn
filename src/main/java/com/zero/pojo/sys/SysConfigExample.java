package com.zero.pojo.sys;

import java.util.ArrayList;
import java.util.List;

public class SysConfigExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public SysConfigExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    public String getOrderByClause() {
        return orderByClause;
    }

    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    public boolean isDistinct() {
        return distinct;
    }

    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    public Criteria createCriteria() {
        Criteria criteria = createCriteriaInternal();
        if (oredCriteria.size() == 0) {
            oredCriteria.add(criteria);
        }
        return criteria;
    }

    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    protected abstract static class GeneratedCriteria {
        protected List<Criterion> criteria;

        protected GeneratedCriteria() {
            super();
            criteria = new ArrayList<Criterion>();
        }

        public boolean isValid() {
            return criteria.size() > 0;
        }

        public List<Criterion> getAllCriteria() {
            return criteria;
        }

        public List<Criterion> getCriteria() {
            return criteria;
        }

        protected void addCriterion(String condition) {
            if (condition == null) {
                throw new RuntimeException("Value for condition cannot be null");
            }
            criteria.add(new Criterion(condition));
        }

        protected void addCriterion(String condition, Object value, String property) {
            if (value == null) {
                throw new RuntimeException("Value for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value));
        }

        protected void addCriterion(String condition, Object value1, Object value2, String property) {
            if (value1 == null || value2 == null) {
                throw new RuntimeException("Between values for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value1, value2));
        }

        public Criteria andFdIdIsNull() {
            addCriterion("fd_id is null");
            return (Criteria) this;
        }

        public Criteria andFdIdIsNotNull() {
            addCriterion("fd_id is not null");
            return (Criteria) this;
        }

        public Criteria andFdIdEqualTo(String value) {
            addCriterion("fd_id =", value, "fdId");
            return (Criteria) this;
        }

        public Criteria andFdIdNotEqualTo(String value) {
            addCriterion("fd_id <>", value, "fdId");
            return (Criteria) this;
        }

        public Criteria andFdIdGreaterThan(String value) {
            addCriterion("fd_id >", value, "fdId");
            return (Criteria) this;
        }

        public Criteria andFdIdGreaterThanOrEqualTo(String value) {
            addCriterion("fd_id >=", value, "fdId");
            return (Criteria) this;
        }

        public Criteria andFdIdLessThan(String value) {
            addCriterion("fd_id <", value, "fdId");
            return (Criteria) this;
        }

        public Criteria andFdIdLessThanOrEqualTo(String value) {
            addCriterion("fd_id <=", value, "fdId");
            return (Criteria) this;
        }

        public Criteria andFdIdLike(String value) {
            addCriterion("fd_id like", value, "fdId");
            return (Criteria) this;
        }

        public Criteria andFdIdNotLike(String value) {
            addCriterion("fd_id not like", value, "fdId");
            return (Criteria) this;
        }

        public Criteria andFdIdIn(List<String> values) {
            addCriterion("fd_id in", values, "fdId");
            return (Criteria) this;
        }

        public Criteria andFdIdNotIn(List<String> values) {
            addCriterion("fd_id not in", values, "fdId");
            return (Criteria) this;
        }

        public Criteria andFdIdBetween(String value1, String value2) {
            addCriterion("fd_id between", value1, value2, "fdId");
            return (Criteria) this;
        }

        public Criteria andFdIdNotBetween(String value1, String value2) {
            addCriterion("fd_id not between", value1, value2, "fdId");
            return (Criteria) this;
        }

        public Criteria andFdTypeIsNull() {
            addCriterion("fd_type is null");
            return (Criteria) this;
        }

        public Criteria andFdTypeIsNotNull() {
            addCriterion("fd_type is not null");
            return (Criteria) this;
        }

        public Criteria andFdTypeEqualTo(String value) {
            addCriterion("fd_type =", value, "fdType");
            return (Criteria) this;
        }

        public Criteria andFdTypeNotEqualTo(String value) {
            addCriterion("fd_type <>", value, "fdType");
            return (Criteria) this;
        }

        public Criteria andFdTypeGreaterThan(String value) {
            addCriterion("fd_type >", value, "fdType");
            return (Criteria) this;
        }

        public Criteria andFdTypeGreaterThanOrEqualTo(String value) {
            addCriterion("fd_type >=", value, "fdType");
            return (Criteria) this;
        }

        public Criteria andFdTypeLessThan(String value) {
            addCriterion("fd_type <", value, "fdType");
            return (Criteria) this;
        }

        public Criteria andFdTypeLessThanOrEqualTo(String value) {
            addCriterion("fd_type <=", value, "fdType");
            return (Criteria) this;
        }

        public Criteria andFdTypeLike(String value) {
            addCriterion("fd_type like", value, "fdType");
            return (Criteria) this;
        }

        public Criteria andFdTypeNotLike(String value) {
            addCriterion("fd_type not like", value, "fdType");
            return (Criteria) this;
        }

        public Criteria andFdTypeIn(List<String> values) {
            addCriterion("fd_type in", values, "fdType");
            return (Criteria) this;
        }

        public Criteria andFdTypeNotIn(List<String> values) {
            addCriterion("fd_type not in", values, "fdType");
            return (Criteria) this;
        }

        public Criteria andFdTypeBetween(String value1, String value2) {
            addCriterion("fd_type between", value1, value2, "fdType");
            return (Criteria) this;
        }

        public Criteria andFdTypeNotBetween(String value1, String value2) {
            addCriterion("fd_type not between", value1, value2, "fdType");
            return (Criteria) this;
        }

        public Criteria andFdValueIsNull() {
            addCriterion("fd_value is null");
            return (Criteria) this;
        }

        public Criteria andFdValueIsNotNull() {
            addCriterion("fd_value is not null");
            return (Criteria) this;
        }

        public Criteria andFdValueEqualTo(String value) {
            addCriterion("fd_value =", value, "fdValue");
            return (Criteria) this;
        }

        public Criteria andFdValueNotEqualTo(String value) {
            addCriterion("fd_value <>", value, "fdValue");
            return (Criteria) this;
        }

        public Criteria andFdValueGreaterThan(String value) {
            addCriterion("fd_value >", value, "fdValue");
            return (Criteria) this;
        }

        public Criteria andFdValueGreaterThanOrEqualTo(String value) {
            addCriterion("fd_value >=", value, "fdValue");
            return (Criteria) this;
        }

        public Criteria andFdValueLessThan(String value) {
            addCriterion("fd_value <", value, "fdValue");
            return (Criteria) this;
        }

        public Criteria andFdValueLessThanOrEqualTo(String value) {
            addCriterion("fd_value <=", value, "fdValue");
            return (Criteria) this;
        }

        public Criteria andFdValueLike(String value) {
            addCriterion("fd_value like", value, "fdValue");
            return (Criteria) this;
        }

        public Criteria andFdValueNotLike(String value) {
            addCriterion("fd_value not like", value, "fdValue");
            return (Criteria) this;
        }

        public Criteria andFdValueIn(List<String> values) {
            addCriterion("fd_value in", values, "fdValue");
            return (Criteria) this;
        }

        public Criteria andFdValueNotIn(List<String> values) {
            addCriterion("fd_value not in", values, "fdValue");
            return (Criteria) this;
        }

        public Criteria andFdValueBetween(String value1, String value2) {
            addCriterion("fd_value between", value1, value2, "fdValue");
            return (Criteria) this;
        }

        public Criteria andFdValueNotBetween(String value1, String value2) {
            addCriterion("fd_value not between", value1, value2, "fdValue");
            return (Criteria) this;
        }

        public Criteria andFdBak1IsNull() {
            addCriterion("fd_bak_1 is null");
            return (Criteria) this;
        }

        public Criteria andFdBak1IsNotNull() {
            addCriterion("fd_bak_1 is not null");
            return (Criteria) this;
        }

        public Criteria andFdBak1EqualTo(String value) {
            addCriterion("fd_bak_1 =", value, "fdBak1");
            return (Criteria) this;
        }

        public Criteria andFdBak1NotEqualTo(String value) {
            addCriterion("fd_bak_1 <>", value, "fdBak1");
            return (Criteria) this;
        }

        public Criteria andFdBak1GreaterThan(String value) {
            addCriterion("fd_bak_1 >", value, "fdBak1");
            return (Criteria) this;
        }

        public Criteria andFdBak1GreaterThanOrEqualTo(String value) {
            addCriterion("fd_bak_1 >=", value, "fdBak1");
            return (Criteria) this;
        }

        public Criteria andFdBak1LessThan(String value) {
            addCriterion("fd_bak_1 <", value, "fdBak1");
            return (Criteria) this;
        }

        public Criteria andFdBak1LessThanOrEqualTo(String value) {
            addCriterion("fd_bak_1 <=", value, "fdBak1");
            return (Criteria) this;
        }

        public Criteria andFdBak1Like(String value) {
            addCriterion("fd_bak_1 like", value, "fdBak1");
            return (Criteria) this;
        }

        public Criteria andFdBak1NotLike(String value) {
            addCriterion("fd_bak_1 not like", value, "fdBak1");
            return (Criteria) this;
        }

        public Criteria andFdBak1In(List<String> values) {
            addCriterion("fd_bak_1 in", values, "fdBak1");
            return (Criteria) this;
        }

        public Criteria andFdBak1NotIn(List<String> values) {
            addCriterion("fd_bak_1 not in", values, "fdBak1");
            return (Criteria) this;
        }

        public Criteria andFdBak1Between(String value1, String value2) {
            addCriterion("fd_bak_1 between", value1, value2, "fdBak1");
            return (Criteria) this;
        }

        public Criteria andFdBak1NotBetween(String value1, String value2) {
            addCriterion("fd_bak_1 not between", value1, value2, "fdBak1");
            return (Criteria) this;
        }

        public Criteria andFdBak2IsNull() {
            addCriterion("fd_bak_2 is null");
            return (Criteria) this;
        }

        public Criteria andFdBak2IsNotNull() {
            addCriterion("fd_bak_2 is not null");
            return (Criteria) this;
        }

        public Criteria andFdBak2EqualTo(String value) {
            addCriterion("fd_bak_2 =", value, "fdBak2");
            return (Criteria) this;
        }

        public Criteria andFdBak2NotEqualTo(String value) {
            addCriterion("fd_bak_2 <>", value, "fdBak2");
            return (Criteria) this;
        }

        public Criteria andFdBak2GreaterThan(String value) {
            addCriterion("fd_bak_2 >", value, "fdBak2");
            return (Criteria) this;
        }

        public Criteria andFdBak2GreaterThanOrEqualTo(String value) {
            addCriterion("fd_bak_2 >=", value, "fdBak2");
            return (Criteria) this;
        }

        public Criteria andFdBak2LessThan(String value) {
            addCriterion("fd_bak_2 <", value, "fdBak2");
            return (Criteria) this;
        }

        public Criteria andFdBak2LessThanOrEqualTo(String value) {
            addCriterion("fd_bak_2 <=", value, "fdBak2");
            return (Criteria) this;
        }

        public Criteria andFdBak2Like(String value) {
            addCriterion("fd_bak_2 like", value, "fdBak2");
            return (Criteria) this;
        }

        public Criteria andFdBak2NotLike(String value) {
            addCriterion("fd_bak_2 not like", value, "fdBak2");
            return (Criteria) this;
        }

        public Criteria andFdBak2In(List<String> values) {
            addCriterion("fd_bak_2 in", values, "fdBak2");
            return (Criteria) this;
        }

        public Criteria andFdBak2NotIn(List<String> values) {
            addCriterion("fd_bak_2 not in", values, "fdBak2");
            return (Criteria) this;
        }

        public Criteria andFdBak2Between(String value1, String value2) {
            addCriterion("fd_bak_2 between", value1, value2, "fdBak2");
            return (Criteria) this;
        }

        public Criteria andFdBak2NotBetween(String value1, String value2) {
            addCriterion("fd_bak_2 not between", value1, value2, "fdBak2");
            return (Criteria) this;
        }
    }

    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    public static class Criterion {
        private String condition;

        private Object value;

        private Object secondValue;

        private boolean noValue;

        private boolean singleValue;

        private boolean betweenValue;

        private boolean listValue;

        private String typeHandler;

        public String getCondition() {
            return condition;
        }

        public Object getValue() {
            return value;
        }

        public Object getSecondValue() {
            return secondValue;
        }

        public boolean isNoValue() {
            return noValue;
        }

        public boolean isSingleValue() {
            return singleValue;
        }

        public boolean isBetweenValue() {
            return betweenValue;
        }

        public boolean isListValue() {
            return listValue;
        }

        public String getTypeHandler() {
            return typeHandler;
        }

        protected Criterion(String condition) {
            super();
            this.condition = condition;
            this.typeHandler = null;
            this.noValue = true;
        }

        protected Criterion(String condition, Object value, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.typeHandler = typeHandler;
            if (value instanceof List<?>) {
                this.listValue = true;
            } else {
                this.singleValue = true;
            }
        }

        protected Criterion(String condition, Object value) {
            this(condition, value, null);
        }

        protected Criterion(String condition, Object value, Object secondValue, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.secondValue = secondValue;
            this.typeHandler = typeHandler;
            this.betweenValue = true;
        }

        protected Criterion(String condition, Object value, Object secondValue) {
            this(condition, value, secondValue, null);
        }
    }
}